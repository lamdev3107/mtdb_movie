import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.scss'],
})
export class MovieFilterComponent {
  @Input() genres: string[] = [];
  @Input() selectedGenres: string[] = [];
  @Output() genresChange = new EventEmitter<string[]>();

  @Input() dateRange: { from: string; to: string } | undefined;
  @Output() dateRangeChange = new EventEmitter<{ from: string; to: string }>();

  @Input() showMe: string | undefined;
  @Output() showMeChange = new EventEmitter<string>();

  toggleGenre(genre: string) {
    const idx = this.selectedGenres.indexOf(genre);
    if (idx > -1) {
      this.selectedGenres.splice(idx, 1);
    } else {
      this.selectedGenres.push(genre);
    }
    this.genresChange.emit(this.selectedGenres);
  }
}
