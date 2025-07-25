import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import {
  ListMovieResponse,
  Movie,
  MovieDetail,
  TrailerItem,
} from '../models/movie.model';

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
  getMovieDetails(id: string): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(`${this.baseUrl}/${id}`, {});
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

  // Load trailer từ popular hoặc now_playing
  getLatestTrailers(
    source: 'popular' | 'now_playing' = 'popular',
    count: number = 10
  ): Observable<TrailerItem[]> {
    const url = `${this.baseUrl}/${source}`;

    return this.http.get<ListMovieResponse>(url).pipe(
      switchMap((res) => {
        const movies = res.results.slice(0, count);
        console.log('Check videoRes', movies);

        // Mỗi phim gọi tiếp để lấy video
        const trailerRequests = movies.map((movie: any) =>
          this.http.get<any>(`${this.baseUrl}/${movie.id}/videos`).pipe(
            map((videoRes) => {
              const trailer = videoRes.results.find(
                (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
              );
              if (!trailer) return null;

              return {
                id: movie.id,
                title: movie.title || movie.name,
                description: trailer.name,
                videoKey: trailer.key,
                youtubeUrl: `https://www.youtube.com/embed/${trailer.key}`,
                thumbnail: `https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`,
                backdrop_path: movie.backdrop_path,
              } as TrailerItem;
            })
          )
        );

        /*

        forkJoin(trailerRequests):
          trailerRequests là một mảng các Observable (HTTP request).
          forkJoin sẽ chạy song song tất cả các Observable này.
          Khi tất cả đều hoàn thành, nó trả về một Observable phát ra một mảng kết quả (theo thứ tự của mảng đầu vào).
          .pipe(...):

          Dùng để nối các toán tử RxJS vào Observable trả về từ forkJoin.
          map(...):

          Toán tử này nhận vào mảng kết quả từ forkJoin.
          Hàm bên trong sẽ lọc ra các phần tử khác null (loại bỏ các trailer không hợp lệ).
          Kết quả được ép kiểu về TrailerItem[].
          */
        return forkJoin(trailerRequests).pipe(
          map(
            (trailers: any) =>
              trailers.filter((t: any) => t !== null) as TrailerItem[]
          )
        );
      })
    );
  }
}
