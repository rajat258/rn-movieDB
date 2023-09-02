import {RouteProp, useRoute} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {Alert} from 'react-native';
import {Strings, Url} from '../../constants';
import {getData} from '../../services';
import {CrewType, DetailType} from '../../type';
import {playTrailer} from '../../utils';

export interface DetailHookReturnType {
  item: Partial<DetailType>;
  year: Date;
  genres: string;
  director: Partial<CrewType>;
  trailer: string;
  isTrailer: boolean;
  isLoading: boolean;
  handleTrailer: () => Promise<void>;
}

const useDetailScreen = (): DetailHookReturnType => {
  const route =
    useRoute<RouteProp<{params: {id: number; tv: boolean}}, 'params'>>();
  const [item, setItem] = useState<Partial<DetailType>>({});
  const [trailer, setTrailer] = useState<string>('');
  const [isTrailer, setIsTrailer] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isTv = useRef<boolean>(false);
  const year: Date = new Date(
    item?.release_date ?? item?.first_air_date ?? '01-01-2021',
  );

  const handleTrailer = async (): Promise<void> => {
    if (isTrailer) {
      setIsTrailer(false);
      setTrailer('');
    } else {
      trailerFunction();
      setIsLoading(true);
    }
  };

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
      Alert.alert(Strings.error, Strings.trailerNotAvailable);
    }
  };

  // Note: Trailers for TV are not available in API.
  const trailerFunction = async (): Promise<void> => {
    if (isTv.current) {
      const key = await playTrailer(
        Url.tv + '/' + route.params?.id + Url.videos,
      );
      setIsTrailer(key.length !== 0);
      setTrailer(key);
    } else {
      const key = await playTrailer(
        Url.movie + '/' + route.params?.id + Url.videos,
      );
      setIsTrailer(key.length !== 0);
      setTrailer(key);
    }
  };

  const genres = item?.genres?.map(e => e?.name).join(', ') ?? Strings.noGenres;

  const director: Partial<CrewType> =
    item?.credits?.crew?.filter(e => e.job === Strings.director)[0] ?? {};

  useEffect(() => {
    getItem();
  }, []);

  return {
    isLoading,
    trailer,
    handleTrailer,
    director,
    year,
    item,
    genres,
    isTrailer,
  };
};

export default useDetailScreen;
