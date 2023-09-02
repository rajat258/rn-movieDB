import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import {firestoreConstant} from '../../constants';
import type {ChatType, GroupType} from '../../type';

export interface ChatHookReturnType {
  data: ChatType[];
  group: GroupType[];
}

const useChat = (): ChatHookReturnType => {
  const [data, setData] = useState<Array<ChatType>>([]);
  const [group, setGroup] = useState<Array<GroupType>>([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection(firestoreConstant.groupChat)
      .onSnapshot(async querySnap => {
        await Promise.all(
          querySnap.docs.map(async instance => {
            let isAvailable: boolean = false;
            instance.data().members?.forEach((element: string) => {
              if (element === auth().currentUser?.uid) {
                isAvailable = true;
              }
            });
            if (isAvailable) {
              const isExist = (
                await firestore()
                  .collection(firestoreConstant.chat)
                  .doc(instance.data()?.id)
                  .get()
              ).exists;
              if (isExist) {
                const timeStamp = (
                  await firestore()
                    .collection(firestoreConstant.chat)
                    .doc(instance.data()?.id)
                    .get()
                ).data();
                return {
                  ...instance.data(),
                  timeStamp: timeStamp?.timeStamp,
                };
              } else {
                return {
                  ...instance.data(),
                  timeStamp: 0,
                };
              }
            }
          }),
        ).then(async updatedData => {
          updatedData = updatedData.filter(e => e !== undefined);
          updatedData = updatedData.sort(
            (b, a) => Number(a?.timeStamp) - Number(b?.timeStamp),
          );
          setGroup([...(updatedData as GroupType[])]);
        });
      });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection(firestoreConstant.chat)
      .onSnapshot(async () => {
        const userData = (
          await firestore().collection(firestoreConstant.users).get()
        ).docs.map(instance => instance.data());
        Promise.all(
          userData.map(async instance => {
            const docId =
              instance.id > (auth().currentUser?.uid as string)
                ? instance.id + '-' + auth().currentUser?.uid
                : auth().currentUser?.uid + '-' + instance.id;
            const isExist = (
              await firestore()
                .collection(firestoreConstant.chat)
                .doc(docId)
                .get()
            ).exists;
            if (isExist) {
              const timeStamp = (
                await firestore()
                  .collection(firestoreConstant.chat)
                  .doc(docId)
                  .get()
              ).data();
              return {
                ...instance,
                timeStamp: timeStamp?.timeStamp,
                unread: timeStamp?.unread,
              };
            } else {
              return {
                ...instance,
                timeStamp: 0,
              };
            }
          }),
        ).then(async updatedData => {
          updatedData = updatedData.sort(
            (b, a) => Number(a.timeStamp) - Number(b.timeStamp),
          );
          setData([...(updatedData as ChatType[])]);
        });
        const groupChatData = (
          await firestore().collection(firestoreConstant.groupChat).get()
        ).docs.map(instance => instance.data());
        Promise.all(
          groupChatData.map(async instance => {
            let isAvailable: boolean = false;
            instance?.members?.forEach((element: string) => {
              if (element === auth().currentUser?.uid) {
                isAvailable = true;
              }
            });
            if (isAvailable) {
              const isExist = (
                await firestore()
                  .collection(firestoreConstant.chat)
                  .doc(instance.id)
                  .get()
              ).exists;
              if (isExist) {
                const timeStamp = (
                  await firestore()
                    .collection(firestoreConstant.chat)
                    .doc(instance.id)
                    .get()
                ).data();
                return {
                  ...instance,
                  timeStamp: timeStamp?.timeStamp,
                  unread: timeStamp?.unread,
                };
              }
              return {
                ...instance,
                timeStamp: 0,
              };
            }
          }),
        ).then(updatedData => {
          updatedData = updatedData.filter(e => e !== undefined);
          updatedData = updatedData.sort(
            (b, a) => Number(a?.timeStamp) - Number(b?.timeStamp),
          );
          setGroup([...(updatedData as GroupType[])]);
        });
      });
    return () => unsubscribe();
  }, []);

  return {
    group,
    data,
  };
};

export default useChat;
