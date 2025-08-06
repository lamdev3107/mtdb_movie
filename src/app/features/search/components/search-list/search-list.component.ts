import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { SearchResponse } from '@features/search/models/search.model';
import { Observable } from 'rxjs';
interface SearchResults {
  loading: boolean;
  suggestions: {
    multi: SearchResponse | null;
    movie: SearchResponse | null;
    tv: SearchResponse | null;
    person: SearchResponse | null;
  };
}
@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
})
export class SearchListComponent implements OnInit, OnChanges {
  @Input() suggestions!: Observable<SearchResults>;
  @Input() activeTabId!: string;
  total_page!: number;
  currentPage!: number;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['suggestions']) {
      if (this.suggestions) {
        const tabKey = this.activeTabId as 'movie' | 'tv' | 'person' | 'multi';
        this.suggestions.subscribe((data) => {
          // this.total_page = Number(data.suggestions[tabKey]?.total_pages);
          // this.currentPage = Number(data.suggestions[tabKey]?.page);
        });
      } else {
        console.log('suggestions không có giá trị');
      }
    }
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }
  constructor(private route: Router) {}
  ngOnInit(): void {}
}
