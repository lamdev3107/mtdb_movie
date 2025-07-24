import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListTVShowResponse, TVShow } from '../models/tv-show.model';

export interface queryListTVShow {
  language: string;
  page: number;
  region: string;
}
export enum queryListTVShowEnum {
  language = 'en-US',
  page = 1,
  region = '',
}

@Injectable({
  providedIn: 'root',
})
export class TVShowService {
  private baseUrl = 'tv';
  private params = {
    language: queryListTVShowEnum.language,
    page: queryListTVShowEnum.page,
    region: queryListTVShowEnum.region,
  };
  constructor(private http: HttpClient) {}

  getPopularTVShows(): Observable<ListTVShowResponse> {
    return this.http.get<ListTVShowResponse>(`${this.baseUrl}/popular`, {});
  }
  getNowPlayingTVShows(): Observable<ListTVShowResponse> {
    return this.http.get<ListTVShowResponse>(`${this.baseUrl}/now_playing`, {});
  }
  getNowTopRatedTVShows(): Observable<ListTVShowResponse> {
    return this.http.get<ListTVShowResponse>(`${this.baseUrl}/top_rated`, {});
  }
  getUpcomingTVShows(): Observable<ListTVShowResponse> {
    return this.http.get<ListTVShowResponse>(`${this.baseUrl}/upcoming`, {});
  }
  getTrendingTVShows(
    time_window: string = 'day'
  ): Observable<ListTVShowResponse> {
    return this.http.get<ListTVShowResponse>(`trending/tv/${time_window}`);
  }
}
