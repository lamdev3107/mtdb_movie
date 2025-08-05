import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SwiperModule } from 'swiper/angular';
import { RouterModule } from '@angular/router';
import { components } from './components';
import { pipes } from './pipes';
@NgModule({
<<<<<<< Updated upstream
  declarations: [...components, ...pipes],
  imports: [CommonModule, FormsModule, SwiperModule, RouterModule],
  exports: [...components, ...pipes],
=======
  declarations: [...components, ...pipes, ActionMenuComponent],
  imports: [
    CommonModule,
    FormsModule,
    SwiperModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [...components, ...pipes, ReactiveFormsModule],
>>>>>>> Stashed changes
})
export class SharedModule {}
