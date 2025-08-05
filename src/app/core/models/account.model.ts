export interface Account {
  avatar: any;
  id: number;
  iso_639_1: string;
  iso3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
}

export interface AccountStates {
  id: number;
  favorite: boolean;
  watchlist: boolean;
  rated: {
    value: number;
  };
}
