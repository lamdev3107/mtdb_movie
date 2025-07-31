import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TrailerItem } from '../../movies/models/movie.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-trailer-modal',
  templateUrl: './trailer-modal.component.html',
  styleUrls: ['./trailer-modal.component.scss'],
})
export class TrailerModalComponent implements OnInit {
  @Input() openModal: boolean = false;
  @Input() trailer: TrailerItem | null = null;
  safeYoutubeUrl: SafeResourceUrl | null = null;
  @Output() closeEvent = new EventEmitter<void>();
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['trailer'].currentValue && changes['openModal'].currentValue) {
      this.handleOnPlayTrailer(changes['trailer'].currentValue);
    }
  }

  handleOnPlayTrailer(trailer: TrailerItem): void {
    this.safeYoutubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      trailer.youtubeUrl
    );
  }

  closeModal(): void {
    this.safeYoutubeUrl = null;
    this.closeEvent.emit();
  }
}
