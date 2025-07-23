import { Component, Input } from '@angular/core';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  isLoading: boolean = false;
  constructor(private loadingService: LoadingService) {}
  ngOnInit(): void {
    this.loadingService.loading$.subscribe((state) => {
      this.isLoading = state.isLoading;
    });
  }
}
