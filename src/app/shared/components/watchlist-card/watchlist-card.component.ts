import { MovieService } from './../../../features/movies/services/movie.service';
import { AccountStates } from './../../../core/models/account.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AccountService } from '@core/services/account.service';
import { TVShowService } from '@features/tv-shows/services/tv-shows.service';
import { ToastService } from '@core/services/toast.service';
import { TVShow } from '@features/tv-shows/models/tv-show.model';

@Component({
  selector: 'app-watchlist-card',
  templateUrl: './watchlist-card.component.html',
  styleUrls: ['./watchlist-card.component.scss'],
})
export class WatchlistCardComponent implements OnInit {
  @Input() mediaType: 'movie' | 'tv' = 'movie';
  @Input() data: any;

  @Output() removeFromWatchlist = new EventEmitter<any>();
  accountStates: AccountStates | null = null;
  constructor(
    private movieService: MovieService,
    private tvShowService: TVShowService,
    private accountService: AccountService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadAccountStatus();
  }
  loadAccountStatus() {
    if (this.mediaType === 'movie') {
      this.movieService
        .getMovieAccountStates(Number(this.data.id))
        .subscribe((res) => {
          this.accountStates = res;
        });
    } else {
      this.tvShowService
        .getTVShowAccountStates(Number(this.data.id))
        .subscribe((res) => {
          this.accountStates = res;
        });
    }
  }
  handleToggleFavorite() {
    if (this.mediaType === 'movie') {
      this.accountService
        .markAsFavorite(
          'movie',
          Number(this.data.id),
          !this.accountStates?.favorite
        )
        .subscribe((res) => {
          this.toastService.success('Thao tác thành công!');
          if (this.accountStates) {
            this.accountStates.favorite = !this.accountStates.favorite;
          }
        });
    } else {
      this.accountService
        .markAsFavorite(
          'tv',
          Number(this.data.id),
          !this.accountStates?.favorite
        )
        .subscribe((res) => {
          this.toastService.success('Thao tác thành công!');
          if (this.accountStates) {
            this.accountStates.favorite = !this.accountStates.favorite;
          }
        });
    }
  }

  handleRemoveFromWatchlist() {
    if (this.mediaType === 'movie') {
      this.accountService
        .addToWatchlist('movie', Number(this?.data.id), false)
        .subscribe((res) => {
          this.toastService.success('Thao tác thành công!');
          if (this.accountStates) {
            this.removeFromWatchlist.emit(this.data);
          }
        });
    } else {
      this.accountService
        .addToWatchlist('tv', Number(this?.data.id), false)
        .subscribe((res) => {
          this.toastService.success('Thao tác thành công!');
          if (this.accountStates) {
            this.removeFromWatchlist.emit(this.data);
          }
        });
    }
  }

  renderTitle() {
    if (this.mediaType === 'movie') {
      return this.data.title;
    } else {
      return this.data.name;
    }
  }

  renderDate() {
    if (this.mediaType === 'movie') {
      return this.data.release_date;
    } else {
      return this.data.first_air_date;
    }
  }
}
