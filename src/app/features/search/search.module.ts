import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchLayoutComponent } from './components/search-layout/search-layout.component';
import { MovieComponent } from './pages/movie/movie.component';


@NgModule({
  declarations: [
    SearchLayoutComponent,
    MovieComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule
  ]
})
export class SearchModule { }
