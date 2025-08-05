import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'tv',
       
      },
      {
        path: 'movie',
        loadChildren: () =>
          import('../movie-search/movie-search.module').then(m => m.MovieSearchModule)
      },
      {
        path: 'person',
        loadChildren: () =>
          import('../person-search/person-search.module').then(m => m.PersonSearchModule)
      }
    ]
  }
];


