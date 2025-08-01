import { Component, OnInit } from '@angular/core';
import { Cast } from '../../models/credit.model';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { finalize, map, Subject, takeUntil } from 'rxjs';
import { Movie, MovieDetail } from '../../models/movie.model';
import { Keyword } from '../../models/keyword.model';
import { Review } from '../../../review/models/review.model';
import { LoadingService } from '@core/services/loading.service';
import { TabItem } from '@shared/components/tab/tab.component';
import { Video } from '@features/movies/models/video.model';
import { Image } from '@features/movies/models/images.model';

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
  review: Review | null = null;
  videos: Video[] = [];
  posters: Image[] = [];
  backdrops: Image[] = [];
  recommendations: Movie[] = [];

  socialTab: TabItem[] = [{ id: 'reviews', label: 'Reviews' }];
  mediaTabs: TabItem[] = [
    { id: 'videos', label: 'Videos' },
    { id: 'posters', label: 'Posters' },
    { id: 'backdrops', label: 'Backdrops' },
  ];
  activeScocialTabId = 'reviews';
  activeTabId = 'videos';

  constructor(
    private movieService: MovieService,
    public route: ActivatedRoute,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.movieId = params.get('id');
      this.loadMovieDetails(this.movieId);
      this.loadMovieKeywords(this.movieId);
      this.loadMovieReview(this.movieId);
      this.loadMovieRecommendations(this.movieId);
      this.loadMovieCredits(this.movieId);
      this.loadMovieVideos(this.movieId);
    });
  }

  onSocialTabChange(tabId: string) {
    this.activeScocialTabId = tabId;
  }

  onMediaTabChange(tabId: string) {
    this.activeTabId = tabId;
    if (tabId !== 'videos') {
      this.loadImages(this.movieId);
    }
  }

  loadMovieVideos(movieId: string | null) {
    this.movieService
      .getMovieVideos(Number(movieId))
      .pipe(
        takeUntil(this.destroy$),
        map((res: Video[]) => res.slice(0, 3))
      )
      .subscribe({
        next: (res) => {
          this.videos = res;
        },
      });
  }

  loadImages(movieId: string | null) {
    this.loadingService.show();
    this.movieService
      .getImages(Number(movieId))
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loadingService.hide();
        })
      )
      .subscribe({
        next: (res) => {
          this.posters = res.posters.slice(0, 5);
          this.backdrops = res.backdrops.slice(0, 5);
          console.log('Check imgage', this.posters, this.backdrops);
        },
      });
  }

  loadMovieDetails(movieId: string | null): void {
    this.loadingService.show();
    this.movieService
      .getMovieDetails(Number(movieId))
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loadingService.hide();
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
          console.log('Check res', res);
        },
      });
  }

  loadMovieReview(movieId: string | null) {
    this.movieService.getMovieReviews(Number(movieId)).subscribe({
      next: (res) => {
        this.review = res.results[0] as Review;
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

  loadMovieCredits(movieId: string | null) {
    this.loadingService.show();

    this.movieService
      .getTopBilledCast(Number(movieId))
      .pipe(
        // Dòng này sử dụng toán tử takeUntil để tự động hủy (unsubscribe) Observable khi destroy$ phát ra giá trị,
        // giúp tránh rò rỉ bộ nhớ khi component bị hủy. Khi gọi destroy$.next(), tất cả các subscription đang lắng nghe sẽ bị dừng lại.
        takeUntil(this.destroy$),
        finalize(() => this.loadingService.hide()) // luôn hide loading dù success hay error
      )
      .subscribe({
        next: (res) => {
          this.castList = res;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(); // Phát ra giá trị để thông báo takeUntil
    this.destroy$.complete(); // Hoàn thành Subject để giải phóng tài nguyên
  }
}
