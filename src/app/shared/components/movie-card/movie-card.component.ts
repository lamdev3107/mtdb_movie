import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Movie } from '@features/movies/models/movie.model';
import { TVShow } from '@features/tv-shows/models/tv-show.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  moviePath = '/movies/details/';
  tvPath = '/tv_shows/details';
  imageBaseUrl = environment.imageBaseUrl;
  @Input() movie!: Movie;
  @Input() tvShow!: TVShow;
  @Input() isLoading: boolean = false;

  detailLink: string = '';

  constructor() {}

  ngOnInit(): void {
    if (this.movie) {
      this.detailLink = this.moviePath + String(this.movie.id);
    } else {
      this.detailLink = this.tvPath + String(this.tvShow.id);
    }
  }
}
