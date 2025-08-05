import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchLayoutComponent } from './components/search-layout/search-layout.component';
import { MovieComponent } from './pages/movie/movie.component';
import { TvShowComponent } from './pages/tv-show/tv-show.component';
import { PersonComponent } from './pages/person/person.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    SearchLayoutComponent,
    MovieComponent,
    TvShowComponent,
    PersonComponent,
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
  ],
})
export class SearchModule {}
