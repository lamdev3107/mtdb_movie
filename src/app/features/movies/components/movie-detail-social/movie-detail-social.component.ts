import { Component, Input, OnInit } from '@angular/core';
import { Review } from '@core/models/review.model';
import { TabItem } from '@shared/components/tab/tab.component';

@Component({
  selector: 'app-movie-detail-social',
  templateUrl: './movie-detail-social.component.html',
  styleUrls: ['./movie-detail-social.component.scss'],
})
export class MovieDetailSocialComponent implements OnInit {
  tabs: TabItem[] = [{ id: 'reviews', label: 'Reviews' }];
  @Input() review: Review | null = null;
  activeTabId = 'reviews';
  constructor() {}

  ngOnInit(): void {}

  onTabChange(tabId: string) {
    this.activeTabId = tabId;
  }
}
