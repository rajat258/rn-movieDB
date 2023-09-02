import React, {LegacyRef, useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  GiftedChat,
  IMessage,
  InputToolbar,
  MessageVideoProps,
  Send,
  SendProps,
} from 'react-native-gifted-chat';
import Video from 'react-native-video';
import {Images} from '../../assets';
import {Strings} from '../../constants';
import {AppStyle, Colors} from '../../theme';
import InputBar from './InputBar';
import styles from './Styles';
import {Header} from './header';
import useChatDetail, {ChatDetailHookReturnType} from './useChatDetail';
import useVideo, {VideoHookReturnType} from './useVideo';

interface RenderSendProps {
  handleInputText: (text: string) => void;
  props: SendProps<IMessage>;
}

const RenderVideo = ({
  props,
}: {
  props: MessageVideoProps<IMessage>;
}): JSX.Element => {
  const {
    size,
    isPlaying,
    videoRef,
    videoOnLoad,
    videoPlayButton,
    fullScreenDismiss,
  }: VideoHookReturnType = useVideo();
  const videoContainer = StyleSheet.flatten([
    styles.videoContainer,
    {height: size.height, width: size.width},
  ]);

  return (
    <View style={videoContainer}>
      <Video
        ref={videoRef as LegacyRef<Video>}
        resizeMode="contain"
        onLoad={({naturalSize}) => videoOnLoad({naturalSize})}
        onFullscreenPlayerDidDismiss={() => fullScreenDismiss()}
        paused={!isPlaying}
        fullscreen={isPlaying}
        controls={isPlaying}
        style={AppStyle.container}
        source={{uri: props?.currentMessage?.video}}
      />
      <TouchableOpacity onPress={videoPlayButton} style={styles.videoButton}>
        <Image
          source={isPlaying ? Images.pause : Images.play}
          style={styles.playPauseImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const RenderSend = ({props, handleInputText}: RenderSendProps): JSX.Element => {
  useEffect(() => {
    handleInputText(props.text as string);
  }, [props.text]);

  return (
    <Send containerStyle={styles.sendButton} {...props}>
      <Text style={styles.sendText} allowFontScaling={false}>
        {Strings.send}
      </Text>
    </Send>
  );
};

const ChatDetail = (): JSX.Element => {
  const {
    messages,
    onSend,
    userId,
    user,
    noMessage,
    receiverUser,
    group,
    handleInputText,
    inputText,
    isLoading,
    startLoading,
    stopLoading,
  }: ChatDetailHookReturnType = useChatDetail();

  const container = StyleSheet.flatten([
    AppStyle.coloredContainer,
    isLoading && {opacity: 0.5},
  ]);

  return (
    <View style={container}>
      <ActivityIndicator
        color={Colors.black}
        animating={isLoading}
        style={AppStyle.activityIndicator}
      />
      <ImageBackground
        style={AppStyle.container}
        source={Images.chatBackground}>
        <Header {...{group}} user={receiverUser} />
        {noMessage && (
          <Image source={Images.startChat} style={styles.startChat} />
        )}
        {userId ? (
          <GiftedChat
            renderUsernameOnMessage={group}
            renderComposer={props => (
              <InputBar
                {...{props, onSend, userId, startLoading, stopLoading}}
                text={inputText}
              />
            )}
            renderMessageVideo={props => <RenderVideo {...{props}} />}
            renderInputToolbar={props => (
              <InputToolbar
                {...props}
                renderSend={renderProps => (
                  <RenderSend {...{handleInputText}} props={renderProps} />
                )}
              />
            )}
            messages={messages}
            onSend={msg => onSend(msg)}
            user={{
              name: user.current?.name,
              avatar: Images.profilePicture,
              _id: userId,
            }}
          />
        ) : (
          <ActivityIndicator animating style={AppStyle.activityIndicator} />
        )}
      </ImageBackground>
    </View>
  );
};

export default ChatDetail;
