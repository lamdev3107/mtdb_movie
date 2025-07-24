import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  baseUrl = 'https://image.tmdb.org/t/p/';
  @Input() posterUrl: string | null = '';
  finalPosterUrl = `${this.baseUrl}${this.posterUrl}`;
  @Input() posterAlt: string | null = '';
  @Input() movieRating: number | null = null;
  @Input() movieTitle: string | null = '';
  @Input() movieReleaseDate: string | null = '';
  @Input() movieLink: number | null = null;

  constructor() {}

  ngOnInit(): void {}
}
