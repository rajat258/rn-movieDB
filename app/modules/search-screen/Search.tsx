import React from 'react';
import {FlatList, Image, TextInput, TouchableOpacity, View} from 'react-native';
import {Images} from '../../assets';
import {Strings} from '../../constants';
import {Colors} from '../../theme';
import type {MovieType} from '../../type';
import {Item} from '../home/Item';
import {HomeSkeleton, ImageSkeleton} from '../home/skeleton';
import styles from './Styles';
import useSearch, {SearchHookReturnType} from './useSearch';

const LoadMoreSkeleton = ({
  data,
}: {
  data: Array<Partial<MovieType>>;
}): JSX.Element => {
  return (
    <>
      {data.length % 2 === 0 ? (
        <ImageSkeleton />
      ) : (
        <View style={styles.loadMoreData}>
          <ImageSkeleton />
        </View>
      )}
    </>
  );
};

const Search = (): JSX.Element => {
  const {
    handleSearch,
    shimmer,
    data,
    handleQuery,
    loadMoreData,
    page,
    total_pages,
  }: SearchHookReturnType = useSearch();

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          onSubmitEditing={handleQuery}
          onChangeText={val => handleSearch(val)}
          autoCorrect={false}
          autoCapitalize="none"
          placeholderTextColor={Colors.grey}
          placeholder={Strings.search}
          style={styles.textInput}
        />
        <TouchableOpacity onPress={handleQuery} style={styles.enterButton}>
          <Image source={Images.enter} style={styles.enterImage} />
        </TouchableOpacity>
      </View>
      {data.length === 0 ? (
        <Image source={{uri: Images.noSearch}} style={styles.noSearchFound} />
      ) : (
        <>
          {shimmer ? (
            <HomeSkeleton />
          ) : (
            <FlatList
              numColumns={2}
              style={styles.flatList}
              showsHorizontalScrollIndicator={false}
              data={data}
              keyExtractor={(item, index) =>
                item?.id?.toString() + index.toString()
              }
              ListFooterComponent={
                page < total_pages ? <LoadMoreSkeleton {...{data}} /> : null
              }
              onEndReached={loadMoreData}
              onEndReachedThreshold={0.4}
              renderItem={({item}) => <Item item={item as MovieType} />}
            />
          )}
        </>
      )}
    </View>
  );
};

export default Search;
