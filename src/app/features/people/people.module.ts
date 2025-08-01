import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeopleRoutingModule } from './people-routing.module';

import { pages } from './pages';
import { components } from './components';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [...pages, ...components],

  imports: [CommonModule, PeopleRoutingModule, HttpClientModule, SharedModule],
})
export class PeopleModule {}
