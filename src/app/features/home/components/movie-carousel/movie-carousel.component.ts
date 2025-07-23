import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Movie } from 'src/app/features/movies/models/movie.model';
import SwiperCore, { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
@Component({
  selector: 'app-movie-carousel',
  templateUrl: './movie-carousel.component.html',
  styleUrls: ['./movie-carousel.component.scss'],
})
export class MovieCarouselComponent implements OnInit {
  @Input() movieList: Movie[] = [];

  constructor() {}

  ngOnInit(): void {
    console.log('Chekc ', this.movieList);
  }
}
