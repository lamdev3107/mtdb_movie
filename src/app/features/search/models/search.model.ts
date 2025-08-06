import { Movie } from '@features/movies/models/movie.model';
import { Person } from '@features/people/models/person.model';
import { TVShow } from '@features/tv-shows/models/tv-show.model';

export type SearchResult = Movie | Person | TVShow;

export interface SearchResponse {
  page: number;
  results: SearchResult[];
  total_pages: number;
  total_results: number;
}
