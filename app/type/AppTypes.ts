import {store} from '../redux';

interface MovieType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  name?: string;
  first_air_date?: string;
  media_type?: string;
}

interface DetailType {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id?: number;
    name?: string;
    poster_path?: string;
    backdrop_path?: null;
  };
  budget: number;
  genres: Partial<
    Array<{
      id: number;
      name: string;
    }>
  >;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Partial<
    Array<{
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    }>
  >;
  production_countries: Partial<
    Array<{
      iso_3166_1: string;
      name: string;
    }>
  >;
  release_date: string;
  first_air_date?: string;
  revenue: number;
  runtime: number;
  spoken_languages: Partial<
    Array<{
      english_name: string;
      iso_639_1: string;
      name: string;
    }>
  >;
  status: string;
  tagline: string;
  title: string;
  name?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits: {
    crew: Array<Partial<CrewType>>;
  };
}

interface CrewType {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}

interface PopularDataStateType {
  popularData: ApiDataStateType;
}

interface TrailerDataStateType {
  trailerData: {
    list: {
      streaming: boolean;
      topRated: boolean;
    };
    load: boolean;
    shimmer: boolean;
    data: {
      page: number;
      results: Array<Partial<MovieType>>;
      total_pages: number;
      total_results: number;
    };
  };
}

interface MovieDataStateType {
  movieData: {
    list: {
      nowPlaying: boolean;
      topRated: boolean;
      upcoming: boolean;
    };
    load: boolean;
    shimmer: boolean;
    data: {
      page: number;
      results: Array<Partial<MovieType>>;
      total_pages: number;
      total_results: number;
    };
  };
}

interface SearchDataStateType {
  searchData: {
    load: boolean;
    shimmer: boolean;
    data: {
      page: number;
      results: Array<Partial<MovieType>>;
      total_pages: number;
      total_results: number;
    };
  };
}

interface TrendingDataStateType {
  trendingData: {
    list: {
      today: boolean;
      week: boolean;
    };
    load: boolean;
    shimmer: boolean;
    data: {
      page: number;
      results: Array<Partial<MovieType>>;
      total_pages: number;
      total_results: number;
    };
  };
}

interface ApiDataStateType {
  list: {
    streaming: boolean;
    tv: boolean;
    rent: boolean;
  };
  load: boolean;
  shimmer: boolean;
  data: {
    page: number;
    results: Array<Partial<MovieType>>;
    total_pages: number;
    total_results: number;
  };
}

interface VideoType {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: null;
  };
  budget: number;
  genres: Array<
    Partial<{
      id: number;
      name: string;
    }>
  >;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<
    Partial<{
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    }>
  >;
  production_countries: Array<
    Partial<{
      iso_3166_1: string;
      name: string;
    }>
  >;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<
    Partial<{
      english_name: string;
      iso_639_1: string;
      name: string;
    }>
  >;
  success: boolean;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: {
    results: Array<
      Partial<{
        iso_639_1: string;
        iso_3166_1: string;
        name: string;
        key: string;
        site: string;
        size: number;
        type: string;
        official: boolean;
        published_at: string;
        id: string;
      }>
    >;
  };
}

interface SearchType {
  page: number;
  results: Array<Partial<MovieType>>;
  total_pages: number;
  total_results: number;
}

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type {
  AppDispatch,
  CrewType,
  DetailType,
  MovieDataStateType,
  MovieType,
  PopularDataStateType,
  RootState,
  SearchDataStateType,
  TrailerDataStateType,
  TrendingDataStateType,
  VideoType,
  SearchType,
};
