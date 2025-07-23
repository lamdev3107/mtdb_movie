import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListMovieResponse, Movie } from '../models/movie.model';

export interface queryListMovie {
  language: string;
  page: number;
  region: string;
}
export enum queryListMovieEnum {
  language = 'en-US',
  page = 1,
  region = '',
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private baseUrl = 'movie';
  private params = {
    language: queryListMovieEnum.language,
    page: queryListMovieEnum.page,
    region: queryListMovieEnum.region,
  };
  constructor(private http: HttpClient) {}

  getPopularMovies(): Observable<ListMovieResponse> {
    return this.http.get<ListMovieResponse>(`${this.baseUrl}/popular`, {});
  }
  getNowPlayingMovies(): Observable<ListMovieResponse> {
    return this.http.get<ListMovieResponse>(`${this.baseUrl}/now_playing`, {});
  }
  getNowTopRatedMovies(): Observable<ListMovieResponse> {
    return this.http.get<ListMovieResponse>(`${this.baseUrl}/top_rated`, {});
  }
  getUpcomingMovies(): Observable<ListMovieResponse> {
    return this.http.get<ListMovieResponse>(`${this.baseUrl}/upcoming`, {});
  }
  getTrendingMovies(
    time_window: string = 'day'
  ): Observable<ListMovieResponse> {
    return this.http.get<ListMovieResponse>(`trending/movie/${time_window}`);
  }
}
