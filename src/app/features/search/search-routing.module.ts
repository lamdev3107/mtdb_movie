import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from './pages/movie/movie.component';
import { TvShowComponent } from './pages/tv-show/tv-show.component';
import { PersonComponent } from './pages/person/person.component';
import { SearchLayoutComponent } from './components/search-layout/search-layout.component';
const routes: Routes = [
  {
    path: '',
    component: SearchLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'movie',
      },
      {
        path: 'tv',
        component: TvShowComponent,
      },
      {
        path: 'movie',
        component: MovieComponent,
      },
      {
        path: 'person',
        component: PersonComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
