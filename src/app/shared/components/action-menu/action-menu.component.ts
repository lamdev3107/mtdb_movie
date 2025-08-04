import {
  Component,
  EventEmitter,
  Output,
  HostListener,
  Input,
} from '@angular/core';
import { Movie } from '@features/movies/models/movie.model';
import { TVShow } from '@features/tv-shows/models/tv-show.model';

@Component({
  selector: 'app-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.scss'],
})
export class ActionMenuComponent {
  isOpen = false;
  @Input() type: 'movie' | 'tv' = 'movie';
  @Input() data?: Movie | TVShow | null = null;
  @Output() addToList = new EventEmitter<void>();
  @Output() addToFavorite = new EventEmitter<void>();
  @Output() addToWatchlist = new EventEmitter<void>();
  @Output() rateMovie = new EventEmitter<void>();

  toggleMenu(event: MouseEvent) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }

  closeMenu() {
    this.isOpen = false;
  }

  // Đóng menu khi click ra ngoài
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.movie-action-menu')) {
      this.closeMenu();
    }
  }
}
