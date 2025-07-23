import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { components } from './components';
import { pages } from './pages';
import { HttpClientModule } from '@angular/common/http';
import { SwiperModule } from 'swiper/angular';
import { MovieCarouselComponent } from './components/movie-carousel/movie-carousel.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';

@NgModule({
  declarations: [...components, ...pages, MovieCarouselComponent, MovieCardComponent],
  imports: [CommonModule, HomeRoutingModule, HttpClientModule, SwiperModule],
})
export class HomeModule {}
