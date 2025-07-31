import { Component, OnInit } from '@angular/core';
import { Cast } from '../../models/credit.model';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { finalize, Subject, takeUntil } from 'rxjs';
import { Movie, MovieDetail } from '../../models/movie.model';
import { Keyword } from '../../models/keyword.model';
import { Review } from '../../models/review.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movieId: string | null = null;
  castList: Cast[] = [];
  keywords: Keyword[] = [];
  imageBaseUrl = 'https://image.tmdb.org/t/p/w500/';
  private destroy$ = new Subject<void>(); // Subject để quản lý hủy đăng
  movie: MovieDetail | null = null;

  movieReview: Review | null = null;

  recommendations: Movie[] = [];

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id');
    this.loadMovieDetails(this.movieId);
    this.loadMovieKeywords(this.movieId);
    this.loadMovieReview(this.movieId);
    this.loadMovieRecommendations(this.movieId);
  }

  loadMovieDetails(movieId: string | null): void {
    this.movieService
      .getMovieDetails(Number(movieId))
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          // this.loadingService.hide();
        })
      )
      .subscribe({
        next: (res) => {
          this.movie = res;
        },
        error: (err) => {
          console.log('Error fetching trailers', err);
        },
      });
  }

  loadMovieKeywords(movieId: string | null) {
    this.movieService
      .getMovieKeywords(Number(movieId))
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.keywords = res;
        },
      });
  }

  loadMovieReview(movieId: string | null) {
    this.movieService.getMovieReviews(Number(movieId)).subscribe({
      next: (res) => {
        this.movieReview = res.results[0] as Review;
      },
    });
  }

  loadMovieRecommendations(movieId: string | null) {
    this.movieService
      .getMovieRecommendations(Number(movieId))
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.recommendations = res;
        },
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next(); // Phát ra giá trị để thông báo takeUntil
    this.destroy$.complete(); // Hoàn thành Subject để giải phóng tài nguyên
  }
}
