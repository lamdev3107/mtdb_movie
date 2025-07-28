import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { header_navigation } from 'src/app/core/utils/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  headerNavigation = header_navigation;
  isHeaderVisible = true;
  private lastScrollTop = 0;
  private scrollThreshold = 10; // Ngưỡng scroll để kích hoạt ẩn/hiện

  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;

    // Chỉ ẩn header khi scroll xuống và đã scroll đủ xa
    if (currentScrollTop > this.scrollThreshold) {
      if (currentScrollTop > this.lastScrollTop) {
        // Cuộn xuống - ẩn header
        this.isHeaderVisible = false;
      } else {
        // Cuộn lên - hiện header
        this.isHeaderVisible = true;
      }
    } else {
      // Ở đầu trang - luôn hiện header
      this.isHeaderVisible = true;
    }

    this.lastScrollTop = currentScrollTop;
  }

  ngOnDestroy(): void {
    // Cleanup nếu cần
  }
}
