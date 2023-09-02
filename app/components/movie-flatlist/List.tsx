import React from 'react';
import {FlatList} from 'react-native';
import {DataSkeleton, HomeSkeleton, ListItem} from '../../modules';
import {MovieType} from '../../type';
import Styles from './Styles';

interface ListProp {
  data: Array<Partial<MovieType>>;
  loadMoreData: () => Promise<void>;
  shimmer: boolean;
  page: number;
  totalPage: number;
}

const List = ({
  data,
  loadMoreData,
  shimmer,
  page,
  totalPage,
}: ListProp): JSX.Element => {
  return (
    <>
      {shimmer ? (
        <HomeSkeleton />
      ) : (
        <FlatList
          horizontal
          style={Styles.flatList}
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={(item, index) =>
            item?.id?.toString() + index.toString()
          }
          ListFooterComponent={page < totalPage ? <DataSkeleton /> : null}
          renderItem={({item}) => <ListItem item={item as MovieType} />}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.9}
        />
      )}
    </>
  );
};

export default List;
