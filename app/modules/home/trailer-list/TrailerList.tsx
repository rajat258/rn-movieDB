import React from 'react';
import {FlatList, Image, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Strings} from '../../../constants';
import {Colors} from '../../../theme';
import type {MovieType} from '../../../type';
import {Header} from '../Home';
import {TrailerImageSkeleton, TrailerSkeleton} from '../skeleton';
import {TrailerDropDown} from '../trailer-drop-down';
import {Item} from './Item';
import Styles from './Styles';
import type {TrailerHookReturnType} from './useTrailer';
import useTrailer from './useTrailer';

interface TrailerListProps {
  totalPage: number;
  page: number;
  shimmer: boolean;
  loadMoreData: () => Promise<void>;
  data: Array<Partial<MovieType>>;
}

const TrailerList = ({
  totalPage,
  page,
  shimmer,
  loadMoreData,
  data,
}: TrailerListProps): JSX.Element => {
  const {
    backgroundImage,
    _onScroll,
    handleBackgroundImage,
  }: TrailerHookReturnType = useTrailer();

  return (
    <>
      <View style={Styles.container}>
        {backgroundImage && (
          <Image
            source={{uri: backgroundImage}}
            style={Styles.backgroundImage}
          />
        )}
        <LinearGradient
          start={{x: 1, y: 0.1}}
          end={{x: 1, y: 1}}
          colors={[Colors.primary, Colors.primary + 50]}
          style={Styles.container}>
          {shimmer ? (
            <TrailerSkeleton />
          ) : (
            <View style={Styles.headerContentContainer}>
              <Header
                text={Strings.trailer}
                shimmer={shimmer}
                style={Styles.headerText}>
                <TrailerDropDown {...{handleBackgroundImage}} />
              </Header>
              <FlatList
                onScroll={e => _onScroll(e)}
                horizontal
                pagingEnabled
                style={Styles.flatList}
                showsHorizontalScrollIndicator={false}
                data={data}
                keyExtractor={(item, index) =>
                  item?.id?.toString() + index.toString()
                }
                ListFooterComponent={
                  page <= totalPage ? <TrailerImageSkeleton /> : null
                }
                renderItem={({item}) => <Item item={item as MovieType} />}
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.9}
              />
            </View>
          )}
        </LinearGradient>
      </View>
    </>
  );
};

export default TrailerList;
