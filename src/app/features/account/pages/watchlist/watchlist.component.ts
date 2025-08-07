import { Component, OnInit } from '@angular/core';
import { AccountService } from '@core/services/account.service';
import { TabItem } from '@shared/components/tab/tab.component';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss'],
})
export class WatchlistComponent implements OnInit {
  // Watchlist sub-tabs
  watchlistSubTabs: TabItem[] = [
    { id: 'movies', label: 'Movies (0)' },
    { id: 'tv', label: 'TV (0)' },
  ];
  watchlistMovies$ = this.accountService.getWatchlistMovies();
  watchlistTv$ = this.accountService.getWatchlistTV();

  activeWatchlistTab: string = 'movies';

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.watchlistMovies$.subscribe((movies) => {
      this.watchlistSubTabs[0].label = `Movies (${movies.total_results})`;
    });
    this.watchlistTv$.subscribe((tv) => {
      this.watchlistSubTabs[1].label = `TV (${tv.total_results})`;
    });
  }

  handleRemoveFromWatchlist() {
    this.watchlistMovies$ = this.accountService.getWatchlistMovies();
    this.watchlistTv$ = this.accountService.getWatchlistTV();
  }
  onWatchlistTabChange(tabId: string): void {
    this.activeWatchlistTab = tabId;
  }
}
