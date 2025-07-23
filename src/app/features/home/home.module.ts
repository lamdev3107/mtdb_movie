import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { components } from './components';
import { pages } from './pages';

@NgModule({
  declarations: [...components, ...pages],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
