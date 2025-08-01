import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { environment } from 'src/environments/environment';
import { TVShowService } from '@features/tv-shows/services/tv-shows.service';
import { TrailerItem } from '@features/movies/models/movie.model';
import { TVShowDetail } from '@features/tv-shows/models/tv-show.model';

@Component({
  selector: 'app-tv-detail-hero',
  templateUrl: './tv-detail-hero.component.html',
  styleUrls: ['./tv-detail-hero.component.scss'],
})
export class TVShowDetailHeroComponent implements OnInit {
  imageBaseUrl = environment.imageBaseUrl;
  id: number | null = null;
  @Input() tvShow: TVShowDetail | null = null;
  age: string = '';
  openTrailerModal = false;
  trailer: TrailerItem | null = null;
  disablePlayTrailer = false;
  constructor(private tvShowService: TVShowService) {}
  genres: string = '';
  sliderOne!: ElementRef<HTMLButtonElement>;

  ngOnInit(): void {
    this.genres =
      this.tvShow?.genres.map((genre) => genre.name).join(', ') || '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tvShow'] && changes['tvShow'].currentValue) {
      this.tvShow = changes['tvShow'].currentValue;
      this.genres =
        changes['tvShow'].currentValue.genres
          .map((genre: any) => genre.name)
          .join(', ') || '';
      this.age = changes['tvShow'].currentValue.adult ? 'R' : 'PG-13';
      this.id = changes['tvShow'].currentValue.id;
      this.loadTraier();
    }
  }

  onPlayTrailer(): void {
    if (this.disablePlayTrailer && !this.trailer) {
      return;
    }
    this.openTrailerModal = true;
  }
  loadTraier() {
    this.tvShowService.getTVShowTrailer(this.id as number).subscribe((res) => {
      if (res === null) {
        this.disablePlayTrailer = true;
        return;
      }
      this.trailer = res;
    });
  }
  onCloseTrailerModal(): void {
    // this.trailer = null;
    this.openTrailerModal = false;
  }
}
