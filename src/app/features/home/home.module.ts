import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { components } from './components';
import { pages } from './pages';
import { HttpClientModule } from '@angular/common/http';
import { SwiperModule } from 'swiper/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { MoviesModule } from '../movies/movies.module';
import { TvShowsModule } from '../tv-shows/tv-shows.module';

@NgModule({
  declarations: [...components, ...pages],
  imports: [
    CommonModule,
    SharedModule,
    MoviesModule,
    TvShowsModule,
    HomeRoutingModule,
    HttpClientModule,
    SwiperModule,
  ],
})
export class HomeModule {}
