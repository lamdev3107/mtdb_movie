import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tv-card',
  templateUrl: './tv-card.component.html',
  styleUrls: ['./tv-card.component.scss'],
})
export class TVCardComponent implements OnInit {
  baseUrl = 'https://image.tmdb.org/t/p/';
  @Input() posterUrl: string | null = '';
  finalPosterUrl = `${this.baseUrl}${this.posterUrl}`;
  @Input() posterAlt: string | null = '';
  @Input() tvRating: number | null = null;
  @Input() tvName: string | null = '';
  @Input() tvFirstAirDate: string | null = '';
  @Input() tvLink: number | null = null;

  constructor() {}

  ngOnInit(): void {}
}
