import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '@features/movies/models/movie.model';

@Component({
  selector: 'app-movie-detail-recommendations-list',
  templateUrl: './movie-detail-recommendations-list.component.html',
  styleUrls: ['./movie-detail-recommendations-list.component.scss'],
})
export class MovieDetailRecommendationsListComponent implements OnInit {
  @Input() recommendations: Movie[] = [];
  constructor() {}

  ngOnInit(): void {}
}
