import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './features/home/home.module';
import { httpInterceptorProviders } from './core/interceptors';
import { SharedModule } from './shared/shared.module';
import { MoviesModule } from './features/movies/movies.module';
import { TvShowsModule } from './features/tv-shows/tv-shows.module';
import { PeopleModule } from './features/people/people.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HomeModule,
    MoviesModule,
    TvShowsModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    PeopleModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
