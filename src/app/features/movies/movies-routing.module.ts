import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './pages/movies/movies.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { ReviewComponent } from './pages/review/review.component';
import { CastComponent } from './pages/cast/cast.component';

// Để di chuyển vào route details/:id/cast, bạn có thể sử dụng routerLink trong template hoặc navigate trong component như sau:

// 1. Sử dụng routerLink trong template HTML:
// <a [routerLink]="['/movies/details', movieId, 'cast']">Xem dàn diễn viên</a>

// 2. Sử dụng Router trong component TypeScript:
import { Router } from '@angular/router';

// Trong constructor inject Router:
// constructor(private router: Router) {}

// Khi muốn chuyển trang:
// this.router.navigate(['/movies/details', movieId, 'cast']);

// Cấu hình routes không cần thay đổi, vẫn giữ nguyên như sau:
// Để truy cập vào details/:id/cast bằng relative link trong Angular, bạn có thể sử dụng routerLink như sau:
// Nếu bạn đang ở trong component MovieDetailsComponent (tức là route details/:id), bạn có thể dùng:
// <a [routerLink]="['cast']" relativeTo="activatedRoute">Xem dàn diễn viên</a>
// Trong đó, activatedRoute là biến được inject từ ActivatedRoute trong constructor:
// constructor(private route: ActivatedRoute) {}
// Và trong template:
// <a [routerLink]="['cast']" [relativeTo]="route">Xem dàn diễn viên</a>

// Hoặc trong code TypeScript, bạn có thể dùng:
// this.router.navigate(['cast'], { relativeTo: this.route });

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
    component: CastComponent,
    pathMatch: 'full',
  },
  {
    path: 'details/:id/reviews',
    component: ReviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule {}
