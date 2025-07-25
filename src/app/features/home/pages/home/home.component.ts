import { Component, OnInit, OnDestroy } from '@angular/core';
import { GenreService } from '../../services/genre.service';
import { Genre, GenreListResponse } from '../../models/genre.model';
import { finalize, Subject, takeUntil } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MovieService } from 'src/app/features/movies/services/movie.service';
import {
  ListMovieResponse,
  Movie,
} from 'src/app/features/movies/models/movie.model';
import { SwiperOptions } from 'swiper';
import { TVShowService } from 'src/app/features/tv-shows/services/tv-shows.service';
import {
  ListTVShowResponse,
  TVShow,
} from 'src/app/features/tv-shows/models/tv-show.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  movieGenres: Genre[] = [];
  trendingMovieList: Movie[] = [];
  popularTVShowList: TVShow[] = [];
  private destroy$ = new Subject<void>(); // Subject để quản lý hủy đăng ký

  trendingOptions = [
    { value: 'day', label: 'Today' },
    { value: 'week', label: 'This Week' },
  ];
  selectedTimeWindow: string = 'day';

  constructor(
    private genreService: GenreService,
    private movieService: MovieService,
    private tvShowService: TVShowService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadMovieGenres();
    this.loadTrendingMovieLists();
    this.loadPopularTVShowLists();
  }

  onTrendingWindowChanged(newValue: string) {
    this.selectedTimeWindow = newValue;
  }

  loadMovieGenres(): void {
    this.loadingService.show();
    this.genreService
      .getMovieGenreList()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loadingService.hide();
        })
      )
      .subscribe({
        next: (res: GenreListResponse) => {
          this.movieGenres = res.genres;
        },
        error: (err) => {
          console.error('Error fetching movie genres list', err);
        },
      });
  }
  loadTrendingMovieLists(): void {
    this.loadingService.show();
    this.movieService
      .getTrendingMovies(this.selectedTimeWindow)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loadingService.hide();
        })
      )
      .subscribe({
        next: (res: ListMovieResponse) => {
          this.trendingMovieList = res.results;
          console.log('check trendingMovieList', this.trendingMovieList);
        },
        error: (err) => {
          console.error('Error fetching trending movie list', err);
        },
      });
  }

  loadPopularTVShowLists(): void {
    this.loadingService.show();
    this.tvShowService
      .getPopularTVShows()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loadingService.hide();
        })
      )
      .subscribe({
        next: (res: ListTVShowResponse) => {
          this.popularTVShowList = res.results;
          console.log('check popularTVShowList', this.popularTVShowList);
        },
        error: (err) => {
          console.error('Error fetching popular tv show list', err);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(); // Phát ra giá trị để thông báo takeUntil
    this.destroy$.complete(); // Hoàn thành Subject để giải phóng tài nguyên
  }
}
