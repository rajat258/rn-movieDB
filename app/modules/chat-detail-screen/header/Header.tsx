import firestore from '@react-native-firebase/firestore';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Images} from '../../../assets';
import {Strings, firestoreConstant} from '../../../constants';
import {ChatType, GroupType} from '../../../type';
import styles from './Styles';

const Header = ({
  user,
  group,
}: {
  user: ChatType | GroupType;
  group: boolean;
}): JSX.Element => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [members, setMembers] = useState<string>('');

  const goBack = (): void => navigation.pop();

  const initData = async (): Promise<void> => {
    if ((user as GroupType)?.members) {
      const Users = await firestore().collection(firestoreConstant.users).get();
      Users.docs.map(firestoreUser => {
        (user as GroupType).members.map(localUser => {
          if (localUser === firestoreUser.id) {
            setMembers(prevMember =>
              prevMember.length === 0
                ? firestoreUser.data().name
                : `${prevMember}, ${firestoreUser.data().name}`,
            );
          }
        });
      });
    }
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Image source={Images.backArrow} style={styles.icon} />
      </TouchableOpacity>
      <Image
        source={group ? Images.groupProfile : Images.profilePicture}
        style={styles.profilePicture}
      />
      <View style={styles.detailContainer}>
        <Text style={styles.userName} allowFontScaling={false}>
          {user?.name}
        </Text>
        {group ? (
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.groupName}
            allowFontScaling={false}>
            {members}
          </Text>
        ) : (
          <Text style={styles.active} allowFontScaling={false}>
            {Strings.active}
          </Text>
        )}
      </View>
      <View style={styles.callContainer}>
        <Image style={styles.icon} source={Images.video} />
      </View>
      <View style={styles.callContainer}>
        <Image style={styles.icon} source={Images.phone} />
      </View>
    </View>
  );
};

export default Header;
