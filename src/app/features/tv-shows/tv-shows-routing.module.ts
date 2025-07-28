import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TvShowsComponent } from './pages/tv-shows/tv-shows.component';
import { TvShowDetailComponent } from './pages/tv-show-detail/tv-show-detail.component';

const routes: Routes = [
  {
    path: '',
    component: TvShowsComponent,
  },
  {
    path: 'detail/:id',
    component: TvShowDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TvShowsRoutingModule {}
