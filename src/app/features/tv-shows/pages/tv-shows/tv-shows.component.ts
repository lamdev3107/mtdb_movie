import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@core/services/loading.service';
import { TVShow } from '@features/tv-shows/models/tv-show.model';
import {
  TVShowCategoryEnum,
  TVShowService,
} from '@features/tv-shows/services/tv-shows.service';

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

  filterObj: any = {};

  constructor(
    private tvShowService: TVShowService,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {}
}
