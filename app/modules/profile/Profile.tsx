import React from 'react';
import {Image, Text, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Images} from '../../assets';
import {ProfileDataSkeleton} from '../../components';
import {Strings} from '../../constants';
import styles from './Styles';
import useProfile, {ProfileHookReturnType} from './useProfile';

const Profile = (): JSX.Element => {
  const {user}: ProfileHookReturnType = useProfile();

  return (
    <View style={styles.container}>
      <Animatable.View animation="zoomIn" style={styles.imageContainer}>
        <Image source={Images.profileImage} style={styles.placeholderImage} />
      </Animatable.View>
      <Animatable.View
        duration={1500}
        animation="bounceIn"
        style={styles.detailContainer}>
        <Text style={styles.headerText} allowFontScaling={false}>
          {Strings.name}
        </Text>
        {user?.email ? (
          <Text style={styles.containText} allowFontScaling={false}>
            {user?.name}
          </Text>
        ) : (
          <ProfileDataSkeleton />
        )}
      </Animatable.View>
      <Animatable.View
        duration={1500}
        animation="bounceIn"
        style={styles.detailContainer}>
        <Text style={styles.headerText} allowFontScaling={false}>
          {Strings.email}
        </Text>
        {user?.phone ? (
          <Text style={styles.containText} allowFontScaling={false}>
            {user?.email}
          </Text>
        ) : (
          <ProfileDataSkeleton />
        )}
      </Animatable.View>
      <Animatable.View
        duration={1500}
        animation="bounceIn"
        style={styles.detailContainer}>
        <Text style={styles.headerText} allowFontScaling={false}>
          {Strings.phone}
        </Text>
        {user?.phone ? (
          <Text style={styles.containText} allowFontScaling={false}>
            {user?.phone}
          </Text>
        ) : (
          <ProfileDataSkeleton />
        )}
      </Animatable.View>
    </View>
  );
};

export default Profile;
