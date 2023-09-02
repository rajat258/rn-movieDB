import React from 'react';
import {ActivityIndicator, ScrollView} from 'react-native';
import {Colors} from '../../theme';
import DetailComponent from './DetailComponent';
import Styles from './Styles';
import useDetailScreen, {DetailHookReturnType} from './useDetailScreen';

const DetailScreen = (): JSX.Element => {
  const {
    item,
    year,
    genres,
    director,
    trailer,
    handleTrailer,
    isLoading,
    isTrailer,
  }: DetailHookReturnType = useDetailScreen();

  return (
    <>
      <ScrollView
        bounces={false}
        style={Styles.container}
        showsVerticalScrollIndicator={false}>
        {!item?.id ? (
          <ActivityIndicator
            color={Colors.accent200}
            style={Styles.mainIndicator}
            animating={true}
          />
        ) : (
          <DetailComponent
            {...{
              item,
              year,
              genres,
              director,
              trailer,
              handleTrailer,
              isLoading,
              isTrailer,
            }}
          />
        )}
      </ScrollView>
    </>
  );
};

export default DetailScreen;
