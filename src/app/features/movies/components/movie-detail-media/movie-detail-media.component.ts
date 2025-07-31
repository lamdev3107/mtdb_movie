import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Image } from '@features/movies/models/images.model';
import { Video } from '@features/movies/models/video.model';
import { MovieService } from '@features/movies/services/movie.service';
import { TabItem } from '@shared/components/tab/tab.component';
import { finalize, map, Subject, takeUntil } from 'rxjs';
import { LoadingService } from '@core/services/loading.service';

@Component({
  selector: 'app-movie-detail-media',
  templateUrl: './movie-detail-media.component.html',
  styleUrls: ['./movie-detail-media.component.scss'],
})
export class MovieDetailMediaComponent implements OnInit {
  movieId: string | null = null;

  tabs: TabItem[] = [
    { id: 'videos', label: 'Videos' },
    { id: 'posters', label: 'Posters' },
    { id: 'backdrops', label: 'Backdrops' },
  ];
  private destroy$ = new Subject<void>(); // Subject để quản lý hủy đăng

  videos: Video[] = [];
  posters: Image[] = [];
  backdrops: Image[] = [];
  activeTabId = 'videos';
  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id');
    this.loadMovieVideos();
  }

  onTabChange(tabId: string) {
    this.activeTabId = tabId;
    if (tabId !== 'videos') {
      this.loadImages(this.movieId);
    }
  }

  loadMovieVideos() {
    this.movieService
      .getMovieVideos(Number(this.movieId))
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
}
