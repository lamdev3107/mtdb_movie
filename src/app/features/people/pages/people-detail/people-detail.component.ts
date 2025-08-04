import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  catchError,
  map,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import {
  CastJob,
  CrewJob,
  PersonDetail,
} from '@features/people/models/person.model';
import { PeopleService } from '@features/people/services/people.service';

interface ApiState<T> {
  loading: boolean;
  data?: T;
  error?: any;
}

@Component({
  selector: 'app-people-detail',
  templateUrl: './people-detail.component.html',
  styleUrls: ['./people-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleDetailComponent {
  personState$!: Observable<ApiState<PersonDetail>>;
  knownForState$!: Observable<ApiState<any>>;
  creditState$!: Observable<
    ApiState<{ crewJobs: Record<string, CrewJob[]>; castJobs: CastJob[] }>
  >;
  showFullBio = false;

  constructor(
    private peopleService: PeopleService,
    private route: ActivatedRoute
  ) {
    const personId$ = this.route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      shareReplay(1)
    );

    // Person detail state
    this.personState$ = personId$.pipe(
      switchMap((id) =>
        this.peopleService.getPersonDetail(id).pipe(
          map((data) => ({ loading: false, data } as ApiState<PersonDetail>)),
          startWith({ loading: true } as ApiState<PersonDetail>),
          catchError((error) =>
            of({ loading: false, error } as ApiState<PersonDetail>)
          )
        )
      )
    );

    // Known for state
    this.knownForState$ = personId$.pipe(
      switchMap((id) =>
        this.peopleService.getKnownFor(id).pipe(
          map((data) => ({ loading: false, data } as ApiState<any>)),
          startWith({ loading: true } as ApiState<any>),
          catchError((error) => of({ loading: false, error } as ApiState<any>))
        )
      )
    );

    // Combined credit state
    this.creditState$ = personId$.pipe(
      switchMap((id) =>
        this.peopleService.getPersonCombinedCredit(id).pipe(
          map(
            (res) =>
              ({
                loading: false,
                data: {
                  crewJobs: this.groupCrewByJob(res.crew),
                  castJobs: res.cast,
                },
              } as ApiState<{
                crewJobs: Record<string, CrewJob[]>;
                castJobs: CastJob[];
              }>)
          ),
          startWith({ loading: true } as ApiState<{
            crewJobs: Record<string, CrewJob[]>;
            castJobs: CastJob[];
          }>),
          catchError((error) =>
            of({ loading: false, error } as ApiState<{
              crewJobs: Record<string, CrewJob[]>;
              castJobs: CastJob[];
            }>)
          )
        )
      )
    );
  }

  renderKnowForLink(knownFor: any) {
    if (knownFor.media_type === 'movie') {
      return './movies/details/' + knownFor.id;
    }
    return '/tv_shows/details/' + knownFor.id;
  }
  renderAlsoKnownAs(alsoKnownAs: string[] | undefined) {
    if (!alsoKnownAs) return '';
    return alsoKnownAs.join(', ');
  }
  calculateAge(birthday: string | undefined | null) {
    if (!birthday) return 0;
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  renderGender(gender: number | undefined) {
    if (gender === 1) {
      return 'Female';
    }
    if (gender === 2) {
      return 'Male';
    }
    return 'Others';
  }

  private groupCrewByJob(crew: CrewJob[]): Record<string, CrewJob[]> {
    return crew.reduce((acc, item) => {
      const job = item.job;
      if (!acc[job]) acc[job] = [];
      acc[job].push(item);
      return acc;
    }, {} as Record<string, CrewJob[]>);
  }
}
