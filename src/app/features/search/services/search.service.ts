import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchSubject = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
    // Khi search thay đổi → trigger search keyword API
    this.searchSubject
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        filter((query) => query.trim().length > 0)
      )
      .subscribe((query) => {
        this.searchMulti(query).subscribe();
      });
  }

  searchMulti(query: string): Observable<any> {
    return this.http
      .get(`search/multi`, {
        params: {
          query,
        },
      })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
