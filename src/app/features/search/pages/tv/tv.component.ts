import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchResponse } from '@features/search/models/search.model';
import { SearchService } from '@features/search/services/search.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss'],
})
export class TvComponent implements OnInit {
  tvResults$!: Observable<SearchResponse>;

  constructor(
    private route: ActivatedRoute,
    private serviceService: SearchService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const query = params['query'];
      if (query) {
        this.tvResults$ = this.serviceService.searchTV(query!);
      } else {
        this.tvResults$ = this.serviceService.searchTV('');
      }
    });
  }
}
