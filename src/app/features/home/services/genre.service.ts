import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GenreListResponse } from '../models/genre.model';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  private baseUrl = 'genre';

  constructor(private http: HttpClient) {}

  getMovieGenreList(): Observable<GenreListResponse> {
    return this.http.get<GenreListResponse>(`${this.baseUrl}/movie/list`);
  }
}
