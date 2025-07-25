import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwiperModule } from 'swiper/angular';
import { RouterModule } from '@angular/router';
import { components } from './components';
import { pipes } from './pipes';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [...components, ...pipes, FooterComponent],
  imports: [CommonModule, SwiperModule, RouterModule],
  exports: [[...components, ...pipes]],
})
export class SharedModule {}
