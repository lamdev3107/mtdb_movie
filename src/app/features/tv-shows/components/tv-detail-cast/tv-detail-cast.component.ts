import { Component, OnInit } from '@angular/core';
import { Cast } from '@features/movies/models/credit.model';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '@core/services/loading.service';
import { MovieService } from '@features/tv-shows/services/tv-shows.service';

@Component({
  selector: 'app-tv-detail-cast',
  templateUrl: './tv-detail-cast.component.html',
  styleUrls: ['./tv-detail-cast.component.scss'],
})
export class TvDetailCastComponent implements OnInit {
  castList!: Cast[];
  tvId: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private tvService: MovieService,
    private route: ActivatedRoute,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.tvId = this.route.snapshot.paramMap.get('id');
    this.loadMovieCredits();
  }
  loadMovieCredits() {
    this.loadingService.show();

    this.tvService
      .getTopBilledCast(Number(this.tvId))
      .pipe(
        // Dòng này sử dụng toán tử takeUntil để tự động hủy (unsubscribe) Observable khi destroy$ phát ra giá trị,
        // giúp tránh rò rỉ bộ nhớ khi component bị hủy. Khi gọi destroy$.next(), tất cả các subscription đang lắng nghe sẽ bị dừng lại.
        takeUntil(this.destroy$),
        finalize(() => this.loadingService.hide()) // luôn hide loading dù success hay error
      )
      .subscribe({
        next: (res: Cast[]) => {
          this.castList = res;
        },
        error: (err: any) => {
          console.error(err);
        },
      });
  }
}
