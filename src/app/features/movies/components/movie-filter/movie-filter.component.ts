import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Genre } from '@features/home/models/genre.model';
import { RadioOption } from '@shared/components/input-radio-group/input-radio-group.component';
import { SelectOption } from '@shared/components/select/select.component';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.scss'],
})
export class MovieFilterComponent {
  categoryOptions: RadioOption[] = [
    { value: 'popular', label: 'Popular' },
    { value: 'top_rated', label: 'Top Rated' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'now_playing', label: 'Now Playing' },
  ];
  sortByOptions: SelectOption[] = [
    {
      value: 'popularity.desc',
      label: 'Popularity Descending',
    },
    {
      value: 'popularity.asc',
      label: 'Popularity Ascending',
    },
    {
      value: 'vote_average.desc',
      label: 'Rating Descending',
    },
    {
      value: 'vote_average.asc',
      label: 'Rating Ascending',
    },
    {
      value: 'release_date.desc',
      label: 'Release Date Descending',
    },
    {
      value: 'release_date.asc',
      label: 'Release Date Ascending',
    },
  ];
  @Input() movieGenres: Genre[] = [];
  @Input() selectedCategoryValue: string = 'popular';
  @Output() onCategoryChange = new EventEmitter<string>();

  onChangeCategory(value: string) {
    this.onCategoryChange.emit(value);
  }
  // toggleGenre(genre: string) {
  //   const idx = this.selectedGenres.indexOf(genre);
  //   if (idx > -1) {
  //     this.selectedGenres.splice(idx, 1);
  //   } else {
  //     this.selectedGenres.push(genre);
  //   }
  //   this.genresChange.emit(this.selectedGenres);
  // }
}
