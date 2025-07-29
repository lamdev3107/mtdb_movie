import { LoadingService } from 'src/app/core/services/loading.service';
import { Component, OnInit } from '@angular/core';
import { MovieCategoryEnum, MovieService } from '../../services/movie.service';
import { GenreService } from 'src/app/features/home/services/genre.service';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ListMovieResponse, Movie } from '../../models/movie.model';
import { ActivatedRoute } from '@angular/router';
import { Genre, GenreListResponse } from '@features/home/models/genre.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  private destroy$ = new Subject<void>(); // Subject để quản lý hủy đăng ký
  movies: Movie[] = [];
  selectedCategory: string = 'popular';
  sortBy: string = '';

  constructor(
    private movieService: MovieService,
    private loadingService: LoadingService,

    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.loadCategoryMovies(this.selectedCategory as MovieCategoryEnum);
  }

  handleCategoryChange(category: string) {
    this.selectedCategory = category;
    this.loadCategoryMovies(this.selectedCategory as MovieCategoryEnum);
  }

  handleToggleGenre(genreIdList: number[]) {
    console.log('check genreIdList', genreIdList);
  }

  handleSelectSortOption(sortOptionValue: string) {
    console.log('Check sortOptionValue', sortOptionValue);
  }

  // onDateRangeChange(range: { from: string; to: string }) {
  //   this.dateRange = range;
  //   // this.filterMovies();
  // }

  // onShowMeChange(showMe: string) {
  //   this.showMe = showMe;
  //   // this.filterMovies();
  // }
  // loadMovieGenres(): void {
  //   this.loadingService.show();
  //   this.genreService
  //     .getMovieGenreList()
  //     .pipe(
  //       takeUntil(this.destroy$),
  //       finalize(() => {
  //         this.loadingService.hide();
  //       })
  //     )
  //     .subscribe({
  //       next: (res: GenreListResponse) => {
  //         this.movieGenres = res.genres;
  //       },
  //       error: (err) => {
  //         console.error('Error fetching movie genres list', err);
  //       },
  //     });
  // }
  loadCategoryMovies(category: MovieCategoryEnum): void {
    this.loadingService.show();
    this.movieService
      .getMoviesByCategory(category)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loadingService.hide();
        })
      )
      .subscribe({
        next: (res: ListMovieResponse) => {
          this.movies = res.results;
          console.log('check trendingMovieList', this.movies);
        },
        error: (err) => {
          console.error('Error fetching trending movie list', err);
        },
      });
  }
  loadFilterMovies(filterObj: any) {
    this.loadingService.show();
    this.movieService
      .discoverMovie(filterObj)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loadingService.hide();
        })
      )
      .subscribe({
        next: (res: ListMovieResponse) => {
          this.movies = res.results;
          console.log('check trendingMovieList', this.movies);
        },
      });
  }

  // filterMovies() {
  //   // Lọc phim theo selectedGenres, dateRange, showMe...
  //   this.filteredMovies = this.movies; // Thay bằng logic lọc thực tế
  // }
}
