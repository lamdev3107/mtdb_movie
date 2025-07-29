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
    category: MovieCategoryEnum
  ): Observable<ListMovieResponse> {
    return this.http.get<ListMovieResponse>(`${this.baseUrl}/${category}`, {});
  }

  getMovieDetails(movieId: number): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(`${this.baseUrl}/${movieId}`, {});
  }

  getTrendingMovies(
    time_window: string = 'day'
  ): Observable<ListMovieResponse> {
    return this.http.get<ListMovieResponse>(`trending/movie/${time_window}`);
  }

  // Load trailer từ popular hoặc now_playing
  getLatestTrailers(
    source: 'popular' | 'now_playing' = 'popular',
    count: number = 10
  ): Observable<TrailerItem[]> {
    const url = `${this.baseUrl}/${source}`;

    return this.http.get<ListMovieResponse>(url).pipe(
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
    const videos = this.http.get<TrailerItem>(url);
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
    return this.http.get<CreditsResponse>(url);
  }

  getTopBilledCast(movieId: number, count = 10): Observable<Cast[]> {
    const url = `${this.baseUrl}/${movieId}/credits`; // Sửa URL đúng

    return this.http
      .get<CreditsResponse>(url)
      .pipe(
        map((res) => res.cast.sort((a, b) => a.order - b.order).slice(0, count))
      );
  }

  getMovieKeywords(movieId: number): Observable<Keyword[]> {
    const url = `${this.baseUrl}/${movieId}/keywords`;
    return this.http.get<KeywordResponse>(url).pipe(map((res) => res.keywords));
  }

  getMovieReviews(
    movieId: number,
    page: number = 1
  ): Observable<ReviewResponse> {
    const url = `${this.baseUrl}/${movieId}/reviews?page=${page}`;
    return this.http.get<ReviewResponse>(url);
  }

  getMovieRecommendations(
    movieId: number,
    page: number = 1,
    count = 10
  ): Observable<Movie[]> {
    const url = `${this.baseUrl}/${movieId}/recommendations?page=${page}`;

    return this.http
      .get<ListMovieResponse>(url)
      .pipe(map((res) => res.results.slice(0, count)));
  }

  getMovieImages(movieId: number): Observable<MovieImagesResponse> {
    const url = `${this.baseUrl}/${movieId}/images`;
    return this.http.get<MovieImagesResponse>(url);
  }

  getMovieVideos(movieId: number): Observable<Video[]> {
    const url = `${this.baseUrl}/${movieId}/videos`;
    return this.http.get<VideoResponse>(url).pipe(map((res) => res.results));
  }

  discoverMovie(filters: {
    sort_by?: string;
    with_genres?: string; // VD: "28,12"
    primary_release_date_gte?: string; // YYYY-MM-DD
    primary_release_date_lte?: string;
    with_original_language?: string;
    certification_country?: string;
    certification?: string;
    page?: number;
  }): Observable<any> {
    const url = `${this.baseUrl}/discover/movie`;
    let params = new HttpParams();

    if (filters.sort_by) params = params.set('sort_by', filters.sort_by);
    if (filters.with_genres)
      params = params.set('with_genres', filters.with_genres);
    if (filters.primary_release_date_gte)
      params = params.set(
        'primary_release_date.gte',
        filters.primary_release_date_gte
      );
    if (filters.primary_release_date_lte)
      params = params.set(
        'primary_release_date.lte',
        filters.primary_release_date_lte
      );
    if (filters.with_original_language)
      params = params.set(
        'with_original_language',
        filters.with_original_language
      );
    if (filters.certification_country)
      params = params.set(
        'certification_country',
        filters.certification_country
      );
    if (filters.certification)
      params = params.set('certification', filters.certification);
    if (filters.page) params = params.set('page', filters.page.toString());

    return this.http.get(url, { params });
  }
}
