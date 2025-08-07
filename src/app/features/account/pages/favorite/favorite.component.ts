import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AccountService } from '@core/services/account.service';
import { TabItem } from '@shared/components/tab/tab.component';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
  // Favorite sub-tabs
  favoriteSubTabs: TabItem[] = [
    { id: 'movies', label: 'Movies (0)' },
    { id: 'tv', label: 'TV (0)' },
  ];

  favoriteMovies$ = this.accountService.getFavoriteMovies();
  favoriteTv$ = this.accountService.getFavoriteTV();

  activeFavoriteTab: string = 'movies';

  constructor(
    private accountService: AccountService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.favoriteMovies$.subscribe((movies) => {
      this.favoriteSubTabs[0].label = `Movies (${movies.total_results})`;
      this.cdr.detectChanges();
    });
    this.favoriteTv$.subscribe((tv) => {
      this.favoriteSubTabs[1].label = `TV (${tv.total_results})`;
      this.cdr.detectChanges();
    });
  }

  handleRemoveFromFavorite() {
    this.favoriteMovies$ = this.accountService.getFavoriteMovies();
    this.favoriteTv$ = this.accountService.getFavoriteTV();
  }
  onFavoriteTabChange(tabId: string): void {
    this.activeFavoriteTab = tabId;
  }
}
