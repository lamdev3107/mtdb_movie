import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewDetailComponent } from './pages/review-detail/review-detail.component';
import { NotFoundComponent } from '@shared/maintances/not-found/not-found.component';

const routes: Routes = [
  {
    path: ':id',
    component: ReviewDetailComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewRoutingModule {}
