import { SearchModule } from './features/search/search.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '@shared/components/main-layout/main-layout.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('./features/movies/movies.module').then((m) => m.MoviesModule),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./features/search/search.module').then((m) => m.SearchModule),
  },
  {
    path: 'tv_shows',
    loadChildren: () =>
      import('./features/tv-shows/tv-shows.module').then(
        (m) => m.TvShowsModule
      ),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./features/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'people',
    loadChildren: () =>
      import('./features/people/people.module').then((m) => m.PeopleModule),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled', // Scroll lên đầu mỗi khi navigate , back lại router cũ thì trở về vị trí trước khi navigate
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
