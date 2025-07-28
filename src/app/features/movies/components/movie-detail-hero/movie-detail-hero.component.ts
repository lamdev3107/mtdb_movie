import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { ActivatedRoute } from '@angular/router';
import { finalize, Observable, Subject, takeUntil } from 'rxjs';
import { MovieDetail, TrailerItem } from '../../models/movie.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-detail-hero',
  templateUrl: './movie-detail-hero.component.html',
  styleUrls: ['./movie-detail-hero.component.scss'],
})
export class MovieDetailHeroComponent implements OnInit {
  imageBaseUrl = environment.imageBaseUrl;
  id: string | null = null;
  @Input() movie: MovieDetail | null = null;
  age: string = '';
  openTrailerModal = false;
  trailer: TrailerItem | null = null;
  constructor(private movieService: MovieService) {}
  genres: string = '';

  ngOnInit(): void {
    this.genres =
      this.movie?.genres.map((genre) => genre.name).join(', ') || '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movie'] && changes['movie'].currentValue) {
      this.movie = changes['movie'].currentValue;
      this.genres =
        changes['movie'].currentValue.genres
          .map((genre: any) => genre.name)
          .join(', ') || '';
      this.age = changes['movie'].currentValue.adult ? 'R' : 'PG-13';
      this.id = changes['movie'].currentValue.id;
      console.log('Check movie', this.movie);
    }
  }
  onPlayTrailer(): void {
    this.movieService.getMovieTrailer(this.id as string).subscribe((res) => {
      this.trailer = res;
      this.openTrailerModal = true;
    });
  }
  onCloseTrailerModal(): void {
    this.trailer = null;
    this.openTrailerModal = false;
  }
}
