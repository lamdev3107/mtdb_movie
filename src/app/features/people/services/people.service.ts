import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PeopleResponse, Person, PersonDetail } from '../models/person.model';
import { Observable } from 'rxjs';

export interface queryListMovie {
  language: string;
  page: number;
  region: string;
}
@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private baseUrl = 'person';
  constructor(private http: HttpClient) {}

  getPopularPeople(
    page: number = 1,
    language: string = 'en-US'
  ): Observable<PeopleResponse> {
    let params = new HttpParams();
    params = params.set('page', page);

    return this.http.get<PeopleResponse>(`${this.baseUrl}/popular`, {
      params: params,
    });
  }

  getPersonDetail(
    personId: number,
    language: string = 'en-US'
  ): Observable<PersonDetail> {
    return this.http.get<PersonDetail>(`${this.baseUrl}/${personId}`, {
      params: {
        language,
      },
    });
  }
}
