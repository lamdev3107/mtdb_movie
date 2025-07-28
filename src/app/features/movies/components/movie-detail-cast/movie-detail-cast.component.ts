import { Component, Input, OnInit } from '@angular/core';
import { Cast } from '@features/movies/models/credit.model';

@Component({
  selector: 'app-movie-detail-cast',
  templateUrl: './movie-detail-cast.component.html',
  styleUrls: ['./movie-detail-cast.component.scss'],
})
export class MovieDetailCastComponent implements OnInit {
  @Input() castList!: Cast[];
  constructor() {}

  ngOnInit(): void {}
}
