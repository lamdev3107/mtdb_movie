import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Movie } from '@features/movies/models/movie.model';
import { MovieService } from '@features/movies/services/movie.service';
import { SearchService } from '@features/search/services/search.service';
import { map, Observable, shareReplay, startWith } from 'rxjs';
import { header_navigation } from 'src/app/core/utils/constants';
interface ApiState<T> {
  loading: boolean;
  data?: T;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  headerNavigation = header_navigation;
  isHeaderVisible = true;
  private lastScrollTop = 0;
  searchQuery: string = '';
  private scrollThreshold = 10; // Ngưỡng scroll để kích hoạt ẩn/hiện

  trendingMovies$!: Observable<ApiState<Movie[]>>;

  constructor(
    private movieService: MovieService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {}

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollTop > this.scrollThreshold) {
      if (currentScrollTop > this.lastScrollTop) {
        this.isHeaderVisible = false;
      } else {
        this.isHeaderVisible = true;
      }
    } else {
      this.isHeaderVisible = true;
    }

    this.lastScrollTop = currentScrollTop;
  }

  onClickSearchBtn() {}

  onInputChange(value: string) {
    if (value == '') {
      this.trendingMovies$ = this.movieService.getTrendingMovies().pipe(
        startWith({ loading: true } as ApiState<Movie[]>),
        map((res) =>
          'results' in res
            ? ({ loading: false, data: res.results } as ApiState<Movie[]>)
            : res
        )
      );
    }
  }
  getTrendingMovies(): void {
    this.trendingMovies$ = this.movieService.getTrendingMovies().pipe(
      startWith({ loading: true } as ApiState<Movie[]>),
      map((res) =>
        'results' in res
          ? ({ loading: false, data: res.results } as ApiState<Movie[]>)
          : res
      ),
      shareReplay(1) // Giữ lại 1 lần emit gần nhất
    );
  }

  ngOnDestroy(): void {
    // Cleanup nếu cần
  }
}
