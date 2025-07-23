import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [CommonModule, SwiperModule],
})
export class SharedModule {}
