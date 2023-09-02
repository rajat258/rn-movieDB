import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {Images} from '../../assets';
import {firestoreConstant} from '../../constants';
import {getUser} from '../../services';
import type {ChatType, GroupType, UnreadObjectType, User} from '../../type';

export interface ChatDetailHookReturnType {
  messages: IMessage[];
  userId?: string;
  onSend: (msg: IMessage[]) => Promise<void>;
  user: React.MutableRefObject<User | undefined>;
  receiverUser: ChatType | GroupType;
  noMessage: boolean;
  group: boolean;
  inputText: string;
  handleInputText: (text: string) => void;
  isLoading: boolean;
  stopLoading: () => void;
  startLoading: () => void;
}

const useChatDetail = (): ChatDetailHookReturnType => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const [noMessage, setNoMessage] = useState<boolean>(false);
  const {
    params: {
      item: {id: receiverId},
      group,
      docId,
    },
  } =
    useRoute<
      RouteProp<{params: {item: User; group: boolean; docId: string}}, 'params'>
    >();
  const {
    params: {item: receiverUser},
  } = useRoute<RouteProp<{params: {item: ChatType | GroupType}}, 'params'>>();
  const userId = auth().currentUser?.uid as string;
  const user = useRef<User>();

  const startLoading = (): void => setIsLoading(true);

  const stopLoading = (): void => setIsLoading(false);

  const initData = async (): Promise<void> => {
    user.current = (await getUser()) as User;
  };

  const handleInputText = (text: string): void => setInputText(text.trim());

  const onSend = async (msg: IMessage[]): Promise<void> => {
    const tempMessage: IMessage = msg[0];
    const myMessage = {
      ...tempMessage,
      user: {
        ...msg[0].user,
        name: user.current?.name,
        avatar: Images.profilePicture,
      },
      sentBy: userId,
      sentTo: receiverId,
    };
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, myMessage as unknown as IMessage[]),
    );
    // uploading sent message to firebase
    await firestore()
      .collection(firestoreConstant.chat)
      .doc(docId)
      .collection('messages')
      .add({...myMessage, createdAt: firestore.FieldValue.serverTimestamp()});
    // creating unread message object
    const obj: UnreadObjectType = {};
    docId.split('-').map(e => {
      obj[e] = false;
    });
    const isExist = (
      await firestore().collection(firestoreConstant.chat).doc(docId).get()
    ).exists;
    if (isExist) {
      await firestore()
        .collection(firestoreConstant.chat)
        .doc(docId)
        .update({timeStamp: Date.now(), unread: obj});
    } else {
      await firestore()
        .collection(firestoreConstant.chat)
        .doc(docId)
        .set({timeStamp: Date.now(), unread: obj});
    }
  };

  useEffect(() => {
    initData();
    // onSnapshot used for real-time data fetching
    const unsubscribe = firestore()
      .collection(firestoreConstant.chat)
      .doc(docId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnap => {
        const allMessage = querySnap.docs.map(instance => {
          if (instance.data().createdAt) {
            return {
              ...instance.data(),
              createdAt: instance.data().createdAt.toDate(),
            };
          }
          return {
            ...instance.data(),
            createdAt: Date.now(),
          };
        });
        setMessages(allMessage as IMessage[]);
        if (allMessage.length === 0) {
          setNoMessage(true);
        } else {
          setNoMessage(false);
        }
      });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection(firestoreConstant.chat)
      .onSnapshot(() => {
        // if Chat Screen is open => message is read => unread = true

        firestore()
          .collection(firestoreConstant.chat)
          .doc(docId)
          .get()
          .then(async chatData => {
            if (chatData.exists) {
              const unread = chatData.data()?.unread;
              unread[userId] = true;
              await firestore()
                .collection(firestoreConstant.chat)
                .doc(docId)
                .update({...chatData.data(), unread});
            }
          });
      });
    return () => unsubscribe();
  }, []);

  return {
    isLoading,
    startLoading,
    stopLoading,
    messages,
    onSend,
    userId,
    user,
    receiverUser,
    noMessage,
    group,
    handleInputText,
    inputText,
  };
};

export default useChatDetail;
