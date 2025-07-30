import { MovieService } from 'src/app/features/movies/services/movie.service';
import { Component, Input, OnInit } from '@angular/core';
import { Cast } from '@features/movies/models/credit.model';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MovieDetail } from '@features/movies/models/movie.model';
import { LoadingService } from '@core/services/loading.service';

@Component({
  selector: 'app-movie-detail-cast',
  templateUrl: './movie-detail-cast.component.html',
  styleUrls: ['./movie-detail-cast.component.scss'],
})
export class MovieDetailCastComponent implements OnInit {
  castList!: Cast[];
  movieId: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id');
    this.loadMovieCredits();
  }
  loadMovieCredits() {
    this.loadingService.show();

    this.movieService
      .getTopBilledCast(Number(this.movieId))
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
}
