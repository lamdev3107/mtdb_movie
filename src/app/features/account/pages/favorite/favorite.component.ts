import { Component, OnInit } from '@angular/core';
import { TabItem } from '@shared/components/tab/tab.component';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
  // Favorite sub-tabs
  favoriteSubTabs: TabItem[] = [
    { id: 'movies', label: 'Movies 2' },
    { id: 'tv', label: 'TV 1' },
  ];

  activeFavoriteTab: string = 'movies';

  constructor() {}

  ngOnInit(): void {}

  onFavoriteTabChange(tabId: string): void {
    this.activeFavoriteTab = tabId;
  }
}
