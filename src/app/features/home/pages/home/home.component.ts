import { Component, OnInit, OnDestroy } from '@angular/core'; // 👈 Thêm OnDestroy
import { GenreService } from '../../services/genre.service';
import { Genre, GenreListResponse } from '../../models/genre.model';
import { finalize, Observable, Subject, takeUntil } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MovieService } from 'src/app/features/movies/services/movie.service';
import {
  ListMovieResponse,
  Movie,
} from 'src/app/features/movies/models/movie.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  movieGenres: Genre[] = [];
  popularMovieList: Movie[] = [];
  private destroy$ = new Subject<void>(); // Subject để quản lý hủy đăng ký

  constructor(
    private genreService: GenreService,
    private movieService: MovieService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadMovieGenres();
    this.loadPopularMovieLists();
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
  loadPopularMovieLists(): void {
    this.loadingService.show();
    this.movieService
      .getTrendingMovies()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loadingService.hide();
        })
      )
      .subscribe({
        next: (res: ListMovieResponse) => {
          this.popularMovieList = res.results;
        },
        error: (err) => {
          console.error('Error fetching movie genres list', err);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(); // Phát ra giá trị để thông báo takeUntil
    this.destroy$.complete(); // Hoàn thành Subject để giải phóng tài nguyên
    console.log('HomeComponent destroyed. Subscriptions unsubscribed.');
  }
}
