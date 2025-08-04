import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SwiperModule } from 'swiper/angular';
import { RouterModule } from '@angular/router';
import { components } from './components';
import { pipes } from './pipes';
import { ActionMenuComponent } from './components/action-menu/action-menu.component';

@NgModule({
  declarations: [...components, ...pipes, ActionMenuComponent],
  imports: [
    CommonModule,
    FormsModule,
    SwiperModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [...components, ...pipes],
})
export class SharedModule {}
