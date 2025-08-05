import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './pages/movies/movies.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { MovieReviewComponent } from './pages/movie-review/movie-review.component';
import { MovieCastComponent } from './pages/movie-cast/movie-cast.component';

// Để di chuyển vào route details/:id/cast, bạn có thể sử dụng routerLink trong template hoặc navigate trong component như sau:

// 1. Sử dụng routerLink trong template HTML:
// <a [routerLink]="['/movies/details', movieId, 'cast']">Xem dàn diễn viên</a>

// 2. Sử dụng Router trong component TypeScript:
import { Router } from '@angular/router';

// Cấu hình routes giữ nguyên như sau:
const routes: Routes = [
  {
    path: '',
    component: MoviesComponent,
  },
  {
    path: 'details/:id',
    component: MovieDetailsComponent,
  },
  {
    path: 'details/:id/casts',
    component: MovieCastComponent,
    pathMatch: 'full',
  },
  {
    path: 'details/:id/reviews',
    component: MovieReviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule {}
