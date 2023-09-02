import {useScrollToTop} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextProps,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../../assets';
import {List} from '../../components';
import {Strings} from '../../constants';
import {AppStyle, Colors} from '../../theme';
import {opaqueColor} from '../../utils';
import Styles from './HomeStyles';
import {
  MovieHookReturnType,
  PopularHookReturnType,
  TrailerHookReturnType,
  TrendingHookReturnType,
  useMovieData,
  usePopularData,
  useTrailerData,
  useTrendingData,
} from './hooks';
import {MovieDropDown} from './movie-drop-down';
import {PopularDropDown} from './popular-drop-down';
import {TrailerList} from './trailer-list';
import {TrendingDropDown} from './trending-drop-down';
import type {HomeHookReturnType} from './useHome';
import useHome from './useHome';

interface HeaderProps extends TextProps {
  text: string;
  shimmer: boolean;
  children: JSX.Element;
}

export const Header = ({
  text,
  shimmer,
  children,
  ...rest
}: HeaderProps): JSX.Element => {
  return (
    <>
      {!shimmer && (
        <View style={Styles.headerContainer}>
          <Text
            {...rest}
            allowFontScaling={false}
            style={[Styles.headerText, rest.style]}>
            {text}
          </Text>
          {children}
        </View>
      )}
    </>
  );
};

const Home = (): JSX.Element => {
  const {isLoad, _onRefresh, scrollViewRef}: HomeHookReturnType = useHome();
  useScrollToTop(scrollViewRef);

  const {
    loadMorePopularData,
    popularData,
    popularPage,
    popularShimmer,
    popularTotal_pages,
  }: PopularHookReturnType = usePopularData();
  const {
    movieData,
    movieShimmer,
    moviePage,
    movieTotal_pages,
    loadMoreMovieData,
  }: MovieHookReturnType = useMovieData();
  const {
    trendingData,
    trendingShimmer,
    trendingPage,
    trendingTotal_pages,
    loadMoreTrendingData,
  }: TrendingHookReturnType = useTrendingData();
  const {
    trailerData,
    trailerShimmer,
    trailerPage,
    trailerTotal_pages,
    loadMoreTrailerData,
  }: TrailerHookReturnType = useTrailerData();

  return (
    <ScrollView
      ref={scrollViewRef}
      refreshControl={
        <RefreshControl onRefresh={_onRefresh} refreshing={isLoad} />
      }
      showsVerticalScrollIndicator={false}
      contentContainerStyle={Styles.container}
      style={StyleSheet.flatten([
        AppStyle.container,
        AppStyle.backgroundColor,
      ])}>
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        colors={[opaqueColor(Colors.white, 0), Colors.white]}
        style={AppStyle.whiteBlurLine}
      />
      <Header text={Strings.popular} shimmer={popularShimmer}>
        <PopularDropDown />
      </Header>
      <List
        totalPage={popularTotal_pages}
        page={popularPage}
        shimmer={popularShimmer}
        loadMoreData={loadMorePopularData}
        data={popularData}
      />
      <Header text={Strings.newMovies} shimmer={movieShimmer}>
        <MovieDropDown />
      </Header>
      <List
        totalPage={movieTotal_pages}
        page={moviePage}
        shimmer={movieShimmer}
        loadMoreData={loadMoreMovieData}
        data={movieData}
      />
      <TrailerList
        totalPage={trailerTotal_pages}
        page={trailerPage}
        shimmer={trailerShimmer}
        loadMoreData={loadMoreTrailerData}
        data={trailerData}
      />
      <Header text={Strings.trending} shimmer={trendingShimmer}>
        <TrendingDropDown />
      </Header>
      <List
        totalPage={trendingTotal_pages}
        page={trendingPage}
        shimmer={trendingShimmer}
        loadMoreData={loadMoreTrendingData}
        data={trendingData}
      />
      <Image resizeMode="contain" source={Images.wave} style={Styles.wave} />
    </ScrollView>
  );
};

export default Home;
