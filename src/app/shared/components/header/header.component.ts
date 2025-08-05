import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Movie } from '@features/movies/models/movie.model';
import { MovieService } from '@features/movies/services/movie.service';
import { SearchService } from '@features/search/services/search.service';
import { TVShow } from '@features/tv-shows/models/tv-show.model';
import { Person } from '@features/people/models/person.model';
import { Observable, fromEvent, map, of, startWith, switchMap } from 'rxjs';
import { header_navigation } from 'src/app/core/utils/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  headerNavigation = header_navigation;
  isHeaderVisible = true;
  isSearchVisible = false;
  private lastScrollTop = 0;
  private scrollThreshold = 10;

  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollTop > this.scrollThreshold) {
      this.isHeaderVisible = currentScrollTop < this.lastScrollTop;
      this.isSearchVisible = false;
    } else {
      this.isHeaderVisible = true;
    }
    this.lastScrollTop = currentScrollTop;
  }
}
