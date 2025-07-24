import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvShowsRoutingModule } from './tv-shows-routing.module';
import { SwiperModule } from 'swiper/angular';
import { SharedModule } from 'src/app/shared/shared.module';

import { pages } from './pages';
import { components } from './components';

@NgModule({
  declarations: [...components, ...pages],
  imports: [CommonModule, TvShowsRoutingModule, SwiperModule, SharedModule],
  exports: [...components, ...pages],
})
export class TvShowsModule {}
