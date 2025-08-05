import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CastJob,
  combinedCreditResponse,
  CrewJob,
  PeopleResponse,
  Person,
  PersonDetail,
} from '../models/person.model';
import { map, Observable, switchMap } from 'rxjs';

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

  getPersonCombinedCredit(
    personId: number,
    language: string = 'en-US'
  ): Observable<any> {
    return this.http.get<combinedCreditResponse>(
      `${this.baseUrl}/${personId}/combined_credits`,
      {
        params: {
          language,
        },
      }
    );
  }

  getKnownFor(personId: number, language: string = 'en-US'): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}/${personId}/combined_credits`, {
        params: { language },
      })
      .pipe(
        map((res) => {
          // Lấy cast và sort theo popularity
          const sortedCast = res.cast
            .sort((a: CastJob, b: CastJob) => b.popularity - a.popularity)
            .slice(0, 10); //
          const sortedCrew = res.crew.sort(
            (a: CrewJob, b: CrewJob) => b.popularity - a.popularity
          );
          return {
            cast: sortedCast,
            crew: sortedCrew,
          };
        })
      );
  }
}
