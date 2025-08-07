import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchResponse } from '@features/search/models/search.model';
import { SearchService } from '@features/search/services/search.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent implements OnInit {
  personResults$!: Observable<SearchResponse>;

  constructor(
    private route: ActivatedRoute,
    private serviceService: SearchService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const query = params['query'];
      if (query) {
        this.personResults$ = this.serviceService.searchPerson(query!);
      } else {
        this.personResults$ = this.serviceService.searchPerson('');
      }
    });
  }
}
