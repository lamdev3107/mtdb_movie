import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '@core/services/loading.service';
import {
  CastJob,
  combinedCreditResponse,
  CrewJob,
  Person,
  PersonDetail,
} from '@features/people/models/person.model';
import { PeopleService } from '@features/people/services/people.service';
import { Observable, Subject, take, takeUntil, finalize } from 'rxjs';

@Component({
  selector: 'app-people-detail',
  templateUrl: './people-detail.component.html',
  styleUrls: ['./people-detail.component.scss'],
})
export class PeopleDetailComponent implements OnInit {
  person: PersonDetail | null = null;
  personId: string | null = null;
  knowForList: any;
  showFullBio: boolean = false;
  castJobs: CastJob[] = [];
  crewJobs: any = null;
  private destroy$ = new Subject<void>(); // Subject để quản lý hủy đăng
  constructor(
    private peopleService: PeopleService,
    public loadingService: LoadingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.personId = params.get('id');
      this.loadingPerson();
    });
  }

  renderBio(): string {
    if (!this.person?.biography) {
      return '';
    }

    if (!this.showFullBio && this.person.biography.length > 600) {
      return this.person.biography.slice(0, 600) + '...';
    }
    return this.person.biography;
  }

  onToggleReadMoreBtn() {
    this.showFullBio = !this.showFullBio;
    this.renderBio();
  }

  loadingPerson() {
    this.loadingService.show();
    this.peopleService
      .getPersonDetail(Number(this.personId))
      .pipe(
        take(1),
        finalize(() => {
          this.loadingService.hide();
        })
      )
      .subscribe({
        next: (res) => {
          this.person = res;
          console.log('Check person', this.person);
        },
        error: (err) => {
          console.log('Error fetching person detail!', err);
        },
      });
  }

  loadingKnownFor(personId: string){
    this.loadingService.show();
    this.peopleService.getKnownFor(Number(personId)).pipe(take(1), finalize(() => {}))
  }

  loadPersonCombinedCredit(personId: string) {
    this.loadingService.show();
    this.peopleService
      .getPersonCombinedCredit(Number(personId))
      .pipe(
        take(1),
        finalize(() => {
          this.loadingService.hide();
        })
      )
      .subscribe((res: combinedCreditResponse) => {
        this.crewJobs = this.groupCrewByJob(res.crew);
        this.castJobs = res.cast;
      });
  }

  private groupCrewByJob(crew: CrewJob[]) {
    this.crewJobs = crew.reduce((acc: any, item: any) => {
      const job = item.job;
      if (!acc[job]) acc[job] = [];
      acc[job].push(item);
      return acc;
    }, {});
  }
}
