import { LoadingService } from 'src/app/core/services/loading.service';
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { GenreService } from 'src/app/features/home/services/genre.service';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ListMovieResponse, Movie } from '../../models/movie.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  genres = ['Chương Trình Truyền Hình', 'Phim Bí Ẩn', 'Hành Động', 'Hoạt Hình'];
  selectedGenres: string[] = [];
  dateRange = { from: '', to: '' };
  showMe = 'all';
  private destroy$ = new Subject<void>(); // Subject để quản lý hủy đăng ký
  filteredMovies: Movie[] = [];


  constructor(
    private movieService: MovieService,
    private loadingService: LoadingService,
    private genreService: GenreService,
    private route: ActivatedRoute
  ) {
    console.log('MoviesComponent');
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log('Chekcfsadfsad params', params);
    });
  }

  onGenresChange(genres: string[]) {
    this.selectedGenres = genres;
    // this.filterMovies();
  }

  onDateRangeChange(range: { from: string; to: string }) {
    this.dateRange = range;
    // this.filterMovies();
  }

  onShowMeChange(showMe: string) {
    this.showMe = showMe;
    // this.filterMovies();
  }
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
  loadTrendingMovieLists(): void {
    this.loadingService.show();
    this.movieService
      .getTrendingMovies('day')
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loadingService.hide();
        })
      )
      .subscribe({
        next: (res: ListMovieResponse) => {
          this.filteredMovies = res.results;
          console.log('check trendingMovieList', this.filteredMovies);
        },
        error: (err) => {
          console.error('Error fetching trending movie list', err);
        },
      });
  }
  // filterMovies() {
  //   // Lọc phim theo selectedGenres, dateRange, showMe...
  //   this.filteredMovies = this.movies; // Thay bằng logic lọc thực tế
  // }
}
