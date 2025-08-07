import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '@core/models/account.model';
import { AccountService } from '@core/services/account.service';
import { Observable } from 'rxjs';
import { TabItem } from '@shared/components/tab/tab.component';

@Component({
  selector: 'app-account-layout',
  templateUrl: './account-layout.component.html',
  styleUrls: ['./account-layout.component.scss'],
})
export class AccountLayoutComponent implements OnInit {
  accountDetails$!: Observable<Account>;

  // Main tabs
  mainTabs: TabItem[] = [
    { id: 'watchlist', label: 'Watchlist' },
    { id: 'favorite', label: 'Favorite' },
  ];

  activeMainTab: string = 'watchlist';

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.accountDetails$ = this.accountService.getAccountDetails();
  }

  onMainTabChange(tabId: string): void {
    this.activeMainTab = tabId;
    // Navigate to corresponding route
    switch (tabId) {
      case 'watchlist':
        this.router.navigate(['/account/watchlist']);
        break;
      case 'favorite':
        this.router.navigate(['/account/favorite']);
        break;
      default:
        // For other tabs, you can add routes later
        console.log(`Navigating to ${tabId}`);
        break;
    }
  }
}
