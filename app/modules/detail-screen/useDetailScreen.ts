import {RouteProp, useRoute} from '@react-navigation/native';
import {CrewType, DetailType} from '../../type';
import {getData} from '../../services';
import {Strings, Url} from '../../constants';
import {Alert} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import {playTrailer} from '../../utils';

export interface DetailHookReturnType {
  item: Partial<DetailType>;
  year: Date;
  genres: string;
  director: Partial<CrewType>;
  _playTrailer: () => void;
}

const useDetailScreen = (): DetailHookReturnType => {
  const route =
    useRoute<RouteProp<{params: {id: number; tv: boolean}}, 'params'>>();
  const [item, setItem] = useState<Partial<DetailType>>({});
  const isTv = useRef<boolean>(false);
  const year: Date = new Date(
    item?.release_date ?? item?.first_air_date ?? '01-01-2021',
  );

  // const getItem = async (): Promise<void> => {
  //   try {
  //     let url;
  //     if (isTv.current) {
  //       url = Url.tv + '/' + route.params?.id + Url.credits;
  //     } else {
  //       url = Url.movie + '/' + route.params?.id + Url.credits;
  //     }
  //     const data = await getData(url);
  //     setItem(data);
  //   } catch (e) {
  //     if (isTv.current) {
  //       Alert.alert(Strings.error);
  //     } else {
  //       isTv.current = true;
  //       getItem();
  //     }
  //   }
  // };

  const getItem = async (): Promise<void> => {
    let url;
    try {
      if (route.params?.tv) {
        url = Url.tv + '/' + route.params?.id + Url.credits;
      } else {
        url = Url.movie + '/' + route.params?.id + Url.credits;
      }
      const data = await getData(url);
      setItem(data);
    } catch (error) {
      Alert.alert(Strings.error);
    }
  };

  // Note: Trailers for TV are not available in API.
  const _playTrailer = async (): Promise<void> => {
    if (isTv.current) {
      await playTrailer(Url.tv + '/' + route.params?.id + Url.videos);
    } else {
      await playTrailer(Url.movie + '/' + route.params?.id + Url.videos);
    }
  };

  const genres = item?.genres?.map(e => e?.name).join(', ') ?? Strings.noGenres;

  const director: Partial<CrewType> =
    item?.credits?.crew?.filter(e => e.job === Strings.director)[0] ?? {};

  useEffect(() => {
    getItem();
  }, []);

  return {
    director,
    year,
    item,
    genres,
    _playTrailer,
  };
};

export default useDetailScreen;
