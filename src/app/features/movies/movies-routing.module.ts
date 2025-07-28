import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './pages/movies/movies.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { ReviewComponent } from './pages/review/review.component';
import { CastComponent } from './pages/cast/cast.component';

const routes: Routes = [
  {
    path: '',
    component: MoviesComponent,
  },
  {
    path: 'details/:id',
    component: MovieDetailsComponent,
    children: [
      {
        path: 'cast',
        component: CastComponent,
      },
      {
        path: 'reviews',
        component: ReviewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule {}
