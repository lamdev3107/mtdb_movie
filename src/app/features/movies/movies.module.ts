import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { pages } from './pages';
import { components } from './components';
import { SharedModule } from 'src/app/shared/shared.module';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [...pages, ...components],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    HttpClientModule,
    SharedModule,
    SwiperModule,
  ],
  exports: [...pages, ...components],
})
export class MoviesModule {}
