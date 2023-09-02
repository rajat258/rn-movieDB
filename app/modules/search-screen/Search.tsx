import React from 'react';
import {FlatList, Image, TextInput, TouchableOpacity, View} from 'react-native';
import {Images} from '../../assets';
import {Strings} from '../../constants';
import {Colors} from '../../theme';
import type {MovieType} from '../../type';
import {DataSkeleton, ImageSkeleton, ListItem} from '../home';
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
    isSearched,
    search,
    clearSearch,
  }: SearchHookReturnType = useSearch();

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          value={search}
          allowFontScaling={false}
          onSubmitEditing={handleQuery}
          onChangeText={val => handleSearch(val)}
          autoCorrect={false}
          autoCapitalize="none"
          placeholderTextColor={Colors.grey}
          placeholder={Strings.search}
          style={styles.textInput}
        />
        {search.length !== 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.crossButton}>
            <Image source={Images.cross} style={styles.image} />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={handleQuery} style={styles.enterButton}>
          <Image source={Images.enter} style={styles.image} />
        </TouchableOpacity>
      </View>
      {shimmer ? (
        <>
          <View style={styles.marginTop} />
          <DataSkeleton />
        </>
      ) : (
        <>
          {data.length === 0 && (
            <Image
              source={isSearched ? Images.noResultFound : Images.noSearch}
              style={styles.noSearchFound}
            />
          )}
          <FlatList
            numColumns={2}
            style={styles.flatList}
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={(item, index) =>
              item?.id?.toString() + index.toString()
            }
            ListFooterComponent={
              page < total_pages ? <LoadMoreSkeleton {...{data}} /> : null
            }
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.4}
            renderItem={({item}) => <ListItem item={item as MovieType} />}
          />
        </>
      )}
    </View>
  );
};

export default Search;
