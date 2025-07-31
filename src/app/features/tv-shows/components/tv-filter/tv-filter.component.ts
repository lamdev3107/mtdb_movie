import {
  ConfigurationService,
  Country,
  Language,
} from '../../../../core/services/configuration.service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Genre, GenreListResponse } from '@features/home/models/genre.model';
import { GenreService } from '@features/home/services/genre.service';
import { MovieCategoryEnum } from '@features/movies/services/movie.service';
import {
  TVShowCategoryEnum,
  TVShowService,
} from '@features/tv-shows/services/tv-shows.service';

import { RadioOption } from '@shared/components/input-radio-group/input-radio-group.component';
import { SelectOption } from '@shared/components/select/select.component';
import { ToggleSelectBox } from '@shared/components/toggle-select-box-list/toggle-select-box-list.component';

@Component({
  selector: 'app-tv-filter',
  templateUrl: './tv-filter.component.html',
  styleUrls: ['./tv-filter.component.scss'],
})
export class TVFilterComponent implements OnInit {
  categoryOptions: RadioOption[] = [
    { value: 'popular', label: 'Popular' },
    { value: 'top_rated', label: 'Top Rated' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'now_playing', label: 'Now Playing' },
  ];
  releaseTypes = [
    { value: 1, label: 'Premiere' },
    { value: 2, label: 'Theatrical (limited)' },
    { value: 3, label: 'Theatrical' },
    { value: 4, label: 'Digital' },
    { value: 5, label: 'Physical' },
    { value: 6, label: 'TV' },
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
      value: 'first_air_date.desc',
      label: 'First Air Date Descending',
    },
    {
      value: 'first_air.asc',
      label: 'First Air Date Ascending',
    },
  ];
  selectedSortOptionValue?: string = 'popularity.desc';
  selectedCategoryValue: string = 'popular';
  movieGenres: ToggleSelectBox[] = [];
  selectedCountryValue: string = 'US';
  selectedLanguageValue: string = 'en';
  selectedGenres: ToggleSelectBox[] = [];
  selectedReleaseType: [] = [];
  countryOptions: SelectOption[] = [];
  isSearchAllEpisodes: boolean = true;
  isSearchFirstAirDate: boolean = true;
  dateRange = {
    from: '',
    to: '',
  };
  keyword: string = '';

  languageOptions: SelectOption[] = [];

  @Input() filterObject = {};
  @Input() category = {};
  @Output() onCategoryChange = new EventEmitter<string>();
  @Output() onSelectSortOption = new EventEmitter<string>();
  @Output() onToggleGenre = new EventEmitter<number[]>();
  @Output() onSelectCountry = new EventEmitter<string>();
  @Output() onSelectLanguage = new EventEmitter<string>();
  @Output() onToggleReleaseType = new EventEmitter<number[]>();
  constructor(
    private tvShowService: TVShowService,
    private genreService: GenreService,
    private configurationService: ConfigurationService
  ) {}

  ngOnInit() {
    this.loadGenres();
    this.loadCountries();
    this.loadLanguages();
  }

  onChangeCategory(value: string) {
    this.onCategoryChange.emit(value as TVShowCategoryEnum);
  }
  handleSelectSortOptin(value: string) {
    this.onSelectSortOption.emit(value);
  }
  handleSelectCountry(value: string) {
    this.onSelectCountry.emit(value);
  }
  handleSelectLanguage(value: string) {
    this.onSelectLanguage.emit(value);
  }

  onChangeSelectGenreList(selectedValues: ToggleSelectBox[]) {
    const emitedValues = selectedValues.map((item: any) => item.value);
    this.onToggleGenre.emit(emitedValues);
  }
  onChangeSelectReleaseType(selectedValues: ToggleSelectBox[]) {
    const emitedValues = selectedValues.map((item: any) => item.value);
    this.onToggleReleaseType.emit(emitedValues);
  }

  handleUserScoreMinChange(value: number) {
    console.log('Check min', value);
  }

  handleUserScoreMaxChange(value: number) {
    console.log('Check max', value);
  }
  loadGenres() {
    this.genreService.getTVGenreList().subscribe({
      next: (res: GenreListResponse) => {
        this.movieGenres = res.genres.map((item) => {
          return {
            value: item.id,
            label: item.name,
          };
        });
      },
    });
  }

  loadCountries() {
    this.configurationService.getCountries().subscribe({
      next: (res: any) => {
        this.countryOptions = res.map((item: Country) => {
          return {
            value: item.iso_3166_1,
            label: item.english_name,
          };
        });
      },
    });
  }

  loadLanguages() {
    this.configurationService.getLanguages().subscribe({
      next: (res: any) => {
        this.languageOptions = res.map((item: Language) => {
          return {
            value: item.iso_639_1,
            label: item.english_name,
          };
        });
      },
    });
  }
}
