import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@core/services/loading.service';
import { CardType } from '@core/utils/enums';
import {
  ListTVShowResponse,
  TVShow,
} from '@features/tv-shows/models/tv-show.model';
import {
  TVShowCategoryEnum,
  TVShowService,
} from '@features/tv-shows/services/tv-shows.service';
import { finalize, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.scss'],
})
export class TvShowsComponent implements OnInit {
  private destroy$ = new Subject<void>(); // Subject để quản lý hủy đăng ký
  tvShows: TVShow[] = [];
  category: string = TVShowCategoryEnum.POPULAR;
  page = 1;
  sortBy: string = '';
  cardType: CardType = CardType.TV_SHOW;

  filterObj: any = {};

  constructor(
    private tvShowService: TVShowService,
    public loadingService: LoadingService
  ) {}
  ngOnInit(): void {
    this.loadCategoryTVShows(this.category as TVShowCategoryEnum, this.page);
  }

  handleCategoryChange(category: string) {
    this.resetTVShows();
    this.category = category;
    this.loadCategoryTVShows(this.category as TVShowCategoryEnum, this.page);
    this.filterObj = {};
  }

  handleToggleGenre(genreIdList: number[]) {
    const paramString = genreIdList.join(',');
    console.log('chekc genreIdList', genreIdList);
    this.filterObj.with_genres = paramString;
  }

  handleSelectSortOption(sortOptionValue: string) {
    console.log('chekc sortOption', sortOptionValue);
    this.filterObj.sort_by = sortOptionValue;
  }

  handleLoadMore() {
    this.page += 1;
    if (Object.keys(this.filterObj).length === 0) {
      this.loadCategoryTVShows(this.category as TVShowCategoryEnum, this.page);
      return;
    }
    this.handleFilter();
  }

  handleFilter() {
    this.loadFilterTVShows();
  }

  resetTVShows() {
    this.tvShows = [];
    this.page = 1;
  }

  loadCategoryTVShows(category: TVShowCategoryEnum, page: number): void {
    this.loadingService.show();
    this.tvShowService
      .getTVShowsByCategory(category, page)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loadingService.hide();
        })
      )
      .subscribe({
        next: (res: ListTVShowResponse) => {
          this.tvShows = [...this.tvShows, ...res.results];
          console.log('Chekc res', res.results);
        },
        error: (err) => {
          console.error('Error fetching trending movie list', err);
        },
      });
  }
  loadFilterTVShows() {
    this.loadingService.show();
    this.tvShowService
      .discoverTVShow(this.filterObj, this.page)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loadingService.hide();
        })
      )
      .subscribe({
        next: (res: ListTVShowResponse) => {
          this.tvShows = [...this.tvShows, ...res.results];
        },
      });
  }
}
