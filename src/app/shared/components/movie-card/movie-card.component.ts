import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  moviePath = '/movies/detail/';
  tvPath = '/tv_shows/';
  imageBaseUrl = environment.imageBaseUrl;
  @Input() isMovie: boolean = true;
  @Input() posterPath: string | null = '';
  @Input() posterAlt: string | null = '';
  @Input() rating: number | null = null;
  @Input() title: string | null = '';
  @Input() releaseDate: string | null = '';
  @Input() link: number | null = null;

  detailLink: string = '';

  constructor() {}

  ngOnInit(): void {
    console.log('Chekc isMovie', this.isMovie);
    if (this.isMovie) {
      this.detailLink = this.moviePath + String(this.link);
    } else {
      this.detailLink = this.tvPath + String(this.link);
    }
  }
}
