import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchLayoutComponent } from './components/search-layout/search-layout.component';
import { SearchListComponent } from './components/search-list/search-list.component';
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
        component: SearchListComponent,
      },
      {
        path: 'movie',
        component: SearchListComponent,
      },
      {
        path: 'person',
        component: SearchListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
