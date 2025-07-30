import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import {
  ListMovieResponse,
  Movie,
  MovieDetail,
  TrailerItem,
} from '../models/movie.model';
import { Cast, CreditsResponse } from '../models/credit.model';
import { Keyword, KeywordResponse } from '../models/keyword.model';
import { Review, ReviewResponse } from '../models/review.model';
import { environment } from 'src/environments/environment';
import { MovieImagesResponse } from '../models/images.model';
import { Video, VideoResponse } from '../models/video.model';

export interface queryListMovie {
  language: string;
  page: number;
  region: string;
}
export enum MovieCategoryEnum {
  POPULAR = 'popular',
  NOW_PLAYING = 'now_playing',
  TOP_RATED = 'top_rated',
  UPCOMING = 'upcoming',
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

  getMoviesByCategory(
    category: MovieCategoryEnum,
    page: number = 1
  ): Observable<ListMovieResponse> {
    this.params.page = page;
    return this.http.get<ListMovieResponse>(`${this.baseUrl}/${category}`, {
      params: this.params,
    });
  }

  getMovieDetails(movieId: number): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(`${this.baseUrl}/${movieId}`, {
      params: this.params,
    });
  }

  getTrendingMovies(
    time_window: string = 'day'
  ): Observable<ListMovieResponse> {
    return this.http.get<ListMovieResponse>(`trending/movie/${time_window}`, {
      params: this.params,
    });
  }

  // Load trailer từ popular hoặc now_playing
  getLatestTrailers(
    source: 'popular' | 'now_playing' = 'popular',
    count: number = 10
  ): Observable<TrailerItem[]> {
    const url = `${this.baseUrl}/${source}`;

    return this.http.get<ListMovieResponse>(url, { params: this.params }).pipe(
      switchMap((res) => {
        const movies = res.results.slice(0, count);
        // Sử dụng service getMovieTrailer cho từng movie
        const trailerRequests = movies.map((movie: any) =>
          this.getMovieTrailer(movie.id).pipe(
            // Bổ sung backdrop_path từ movie gốc nếu cần
            map((trailer: TrailerItem | null) => {
              if (!trailer) return null;
              // Nếu trailer.backdrop_path chưa có, gán từ movie
              return {
                ...trailer,
                backdrop_path: trailer.backdrop_path || movie.backdrop_path,
                title: movie.title || movie.name || trailer.title,
              } as TrailerItem;
            })
          )
        );

        return forkJoin(trailerRequests).pipe(
          map(
            (trailers: any) =>
              trailers.filter((t: any) => t !== null) as TrailerItem[]
          )
        );
      })
    );
  }

  getMovieTrailer(id: string): Observable<TrailerItem | null> {
    const url = `${this.baseUrl}/${id}/videos`;
    const videos = this.http.get<TrailerItem>(url, { params: this.params });
    return videos.pipe(
      map((res: any) => {
        const trailer = res.results.find(
          (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
        );
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

  // Hàm lấy danh sách credits dành
  getMovieCredits(id: string): Observable<CreditsResponse> {
    const url = `${this.baseUrl}/${id}/credits`; // Sửa URL đúng
    return this.http.get<CreditsResponse>(url, { params: this.params });
  }

  getTopBilledCast(movieId: number, count = 10): Observable<Cast[]> {
    const url = `${this.baseUrl}/${movieId}/credits`; // Sửa URL đúng

    return this.http
      .get<CreditsResponse>(url, { params: this.params })
      .pipe(
        map((res) => res.cast.sort((a, b) => a.order - b.order).slice(0, count))
      );
  }

  getMovieKeywords(movieId: number): Observable<Keyword[]> {
    const url = `${this.baseUrl}/${movieId}/keywords`;
    return this.http
      .get<KeywordResponse>(url, { params: this.params })
      .pipe(map((res) => res.keywords));
  }

  getMovieReviews(
    movieId: number,
    page: number = 1
  ): Observable<ReviewResponse> {
    const url = `${this.baseUrl}/${movieId}/reviews`;
    const params = { ...this.params, page };
    return this.http.get<ReviewResponse>(url, { params });
  }

  getMovieRecommendations(
    movieId: number,
    page: number = 1,
    count = 10
  ): Observable<Movie[]> {
    const url = `${this.baseUrl}/${movieId}/recommendations`;
    const params = { ...this.params, page };

    return this.http
      .get<ListMovieResponse>(url, { params })
      .pipe(map((res) => res.results.slice(0, count)));
  }

  getMovieImages(movieId: number): Observable<MovieImagesResponse> {
    const url = `${this.baseUrl}/${movieId}/images`;
    return this.http.get<MovieImagesResponse>(url, { params: this.params });
  }

  getMovieVideos(movieId: number): Observable<Video[]> {
    const url = `${this.baseUrl}/${movieId}/videos`;
    return this.http
      .get<VideoResponse>(url, { params: this.params })
      .pipe(map((res) => res.results));
  }

  discoverMovie(filters: any, page: number): Observable<any> {
    const url = `discover/movie`;
    let params = new HttpParams();

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    });

    return this.http.get(url, { params: params });
  }
}
