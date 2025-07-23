import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './features/home/home.module';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { HeaderComponent } from './shared/layouts/header/header.component';

@NgModule({
  declarations: [AppComponent, MainLayoutComponent, HeaderComponent],
  imports: [HomeModule, BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
