import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Movie } from '@features/movies/models/movie.model';
import { MovieService } from '@features/movies/services/movie.service';
import { Person } from '@features/people/models/person.model';
import { SearchService } from '@features/search/services/search.service';
import { TVShow } from '@features/tv-shows/models/tv-show.model';
import { fromEvent, map, Observable, of, startWith, switchMap } from 'rxjs';
interface ApiState<T> {
  loading: boolean;
  data?: T;
}
@Component({
  selector: 'app-search-layout',
  templateUrl: './search-layout.component.html',
  styleUrls: ['./search-layout.component.scss'],
})
export class SearchLayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  searchResults$!: Observable<ApiState<any[]>>;
  trendingResults$!: Observable<ApiState<any[]>>;
  isShowResult = false;
  constructor(
    private movieService: MovieService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.searchInput.nativeElement) {
      this.settingTrengdingData();
      this.settingSearchData();
    }
  }

  settingTrengdingData() {
    this.trendingResults$ = fromEvent<InputEvent>(
      this.searchInput.nativeElement,
      'input'
    ).pipe(
      map((event) => (event.target as HTMLInputElement).value.trim()),
      switchMap((query) => {
        if (!query || query.length === 0) {
          return this.movieService.getTrendingMovies().pipe(
            map((res) => ({ loading: false, data: res.results.slice(0, 8) })),
            startWith({ loading: true } as ApiState<any[]>)
          );
        }
        return of({ loading: false, data: [] } as ApiState<any[]>);
      })
    );
  }

  settingSearchData() {
    this.searchResults$ = fromEvent<InputEvent>(
      this.searchInput.nativeElement,
      'input'
    ).pipe(
      map((event) => (event.target as HTMLInputElement).value.trim()),
      switchMap((query) =>
        query
          ? this.searchService.searchMulti(query).pipe(
              map(
                (res) =>
                  ({
                    loading: false,
                    data: res.results.slice(0, 8),
                  } as ApiState<any[]>)
              ),
              startWith({ loading: true } as ApiState<any[]>)
            )
          : of({ loading: false, data: [] } as ApiState<any[]>)
      )
    );
  }
  // getMediaTitle(item: Movie | TVShow | Person): string {
  //   if ('title' in item) {
  //     return item.media_type;
  //   } else if ('name' in item) {
  //     return item.media_type;
  //   }
  //   return '';
  // }

  getItemTitle(item: Movie | TVShow | Person): string {
    if ('title' in item) {
      return item.title; // Movie
    } else if ('name' in item) {
      return item.name; // TVShow hoặc Person
    }
    return '';
  }
}
