import { Component, Input, OnInit } from '@angular/core';
import { MovieImage } from '@features/movies/models/images.model';
import { Video } from '@features/movies/models/video.model';
import { MovieService } from '@features/movies/services/movie.service';
import { TabItem } from '@shared/components/tab/tab.component';
import { map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-movie-detail-media',
  templateUrl: './movie-detail-media.component.html',
  styleUrls: ['./movie-detail-media.component.scss'],
})
export class MovieDetailMediaComponent implements OnInit {
  @Input() movieId: string | null = null;

  tabs: TabItem[] = [
    { id: 'videos', label: 'Videos' },
    { id: 'posters', label: 'Posters' },
    { id: 'backdrops', label: 'Backdrops' },
  ];
  private destroy$ = new Subject<void>(); // Subject để quản lý hủy đăng

  videos: Video[] = [];
  posters: MovieImage[] = [];
  backdrops: MovieImage[] = [];
  activeTabId = 'videos';
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovieVideos(this.movieId);
  }

  onTabChange(tabId: string) {
    this.activeTabId = tabId;
    if (tabId !== 'videos') {
      this.loadMovieImages(this.movieId);
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

  loadMovieImages(movieId: string | null) {
    this.movieService
      .getMovieImages(Number(movieId))
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.posters = res.posters.slice(0, 5);
          this.backdrops = res.backdrops.slice(0, 5);
          console.log('Check images', this.posters, this.backdrops);
        },
      });
  }
}
