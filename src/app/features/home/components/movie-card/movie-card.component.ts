import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  imageBaseUrl = environment.imageBaseUrl;
  @Input() posterPath: string | null = '';
  @Input() posterAlt: string | null = '';
  @Input() rating: number | null = null;
  @Input() title: string | null = '';
  @Input() releaseDate: string | null = '';
  @Input() link: number | null = null;

  constructor() {}

  ngOnInit(): void {}
}
