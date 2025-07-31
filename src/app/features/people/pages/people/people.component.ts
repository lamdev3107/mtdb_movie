import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@core/services/loading.service';
import { PeopleResponse, Person } from '@features/people/models/person.model';
import { PeopleService } from '@features/people/services/people.service';
import { finalize, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent implements OnInit {
  people: Person[] = [];
  currentPage: number = 1;
  totalPages = 0;
  private destroy$ = new Subject<void>(); // Subject để quản lý hủy đăng ký

  constructor(
    private peopleService: PeopleService,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadPeople(this.currentPage);
  }

  loadPeople(page: number) {
    this.loadingService.show();
    this.peopleService
      .getPopularPeople(page)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loadingService.hide();
        })
      )
      .subscribe({
        next: (res) => {
          this.people = res.results;
          this.totalPages = res.total_pages;
          this.currentPage = res.page;
        },
        error: (err) => {
          console.log('Error fetching people!');
        },
      });
  }

  renderKnownForText(person: Person) {
    return person.known_for.map((item: any) => item.name).join(', ');
  }

  onPageChange(page: number) {
    this.currentPage = page;
    console.log('chek', this.currentPage);
    this.loadPeople(page);
  }
}
