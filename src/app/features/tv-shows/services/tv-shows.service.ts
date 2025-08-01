import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  ListTVShowResponse,
  TVShow,
  TVShowDetail,
} from '../models/tv-show.model';
import { Cast, CreditsResponse } from '@features/movies/models/credit.model';
import { ReviewResponse } from '@features/review/models/review.model';
import { Video, VideoResponse } from '@features/movies/models/video.model';
import { ImagesResponse } from '@features/movies/models/images.model';
import {
  Keyword,
  KeywordResponse,
} from '@features/movies/models/keyword.model';
import { GenreListResponse } from '@features/home/models/genre.model';
import { TrailerItem } from '@features/movies/models/movie.model';

export interface queryListTVShow {
  language: string;
  page: number;
  region: string;
}
export enum TVShowCategoryEnum {
  POPULAR = 'popular',
  NOW_PLAYING = 'now_playing',
  TOP_RATED = 'top_rated',
  UPCOMING = 'upcoming',
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

  getTVShowsByCategory(
    category: TVShowCategoryEnum,
    page: number = 1
  ): Observable<ListTVShowResponse> {
    this.params.page = page;
    return this.http.get<ListTVShowResponse>(`${this.baseUrl}/${category}`, {
      params: this.params,
    });
  }

  getTVShowDetails(tvId: number): Observable<TVShowDetail> {
    return this.http.get<TVShowDetail>(`${this.baseUrl}/${tvId}`, {
      params: this.params,
    });
  }

  getTrendingMovies(
    time_window: string = 'day'
  ): Observable<ListTVShowResponse> {
    return this.http.get<ListTVShowResponse>(`trending/tv/${time_window}`, {
      params: this.params,
    });
  }

  // Hàm lấy danh sách credits dành
  getTVShowCredits(id: string): Observable<CreditsResponse> {
    const url = `${this.baseUrl}/${id}/credits`; // Sửa URL đúng
    return this.http.get<CreditsResponse>(url, { params: this.params });
  }

  getTopBilledCast(tvId: number, count = 10): Observable<Cast[]> {
    const url = `${this.baseUrl}/${tvId}/credits`; // Sửa URL đúng

    return this.http
      .get<CreditsResponse>(url, { params: this.params })
      .pipe(
        map((res) =>
          res.cast.sort((a: Cast, b: Cast) => a.order - b.order).slice(0, count)
        )
      );
  }

  getTVShowKeywords(tvId: number): Observable<Keyword[]> {
    const url = `${this.baseUrl}/${tvId}/keywords`;
    return this.http
      .get<any>(url, { params: this.params })
      .pipe(map((res) => res.results));
  }

  getTVShowReviews(tvId: number, page: number = 1): Observable<ReviewResponse> {
    const url = `${this.baseUrl}/${tvId}/reviews`;
    const params = { ...this.params, page };
    return this.http.get<ReviewResponse>(url, { params });
  }

  getTVShowRecommendations(
    tvId: number,
    page: number = 1,
    count = 10
  ): Observable<TVShow[]> {
    const url = `${this.baseUrl}/${tvId}/recommendations`;
    const params = { ...this.params, page };

    return this.http
      .get<ListTVShowResponse>(url, { params })
      .pipe(map((res) => res.results.slice(0, count)));
  }

  getTVShowTrailer(id: number): Observable<TrailerItem | null> {
    const url = `${this.baseUrl}/${id}/videos`;
    const videos = this.http.get<TrailerItem>(url, { params: this.params });
    return videos.pipe(
      map((res: any) => {
        const trailer = res.results.find(
          (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
        );
        console.log('dfasdfasdf', res);

        if (!trailer) return null;
        return {
          id: Number(id), // ép kiểu về number
          title: trailer.name,
          description: trailer.name,
          videoKey: trailer.key,
          youtubeUrl: `https://www.youtube.com/embed/${trailer.key}`,
          thumbnail: `https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`,
          backdrop_path: trailer.backdrop_path,
        } as TrailerItem;
      })
    );
  }
  getTVShowImages(tvId: number): Observable<ImagesResponse> {
    const url = `${this.baseUrl}/${tvId}/images`;
    return this.http.get<ImagesResponse>(url);
  }

  getTVShowVideos(tvId: number): Observable<Video[]> {
    const url = `${this.baseUrl}/${tvId}/videos`;
    return this.http
      .get<VideoResponse>(url, { params: this.params })
      .pipe(map((res) => res.results));
  }

  discoverTVShow(filters: any, page: number): Observable<any> {
    const url = `discover/tv`;
    let params = new HttpParams();

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    });

    return this.http.get(url, { params: params });
  }
}
