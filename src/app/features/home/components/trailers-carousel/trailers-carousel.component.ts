import {
  Component,
  Input,
  ViewChild,
  AfterViewInit,
  SimpleChanges,
} from '@angular/core';

import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import Swiper from 'swiper';
import { TrailerItem } from 'src/app/features/movies/models/movie.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-trailers-carousel',
  templateUrl: './trailers-carousel.component.html',
  styleUrls: ['./trailers-carousel.component.scss'],
})
export class TrailersCarouselComponent implements AfterViewInit {
  @Input() trailerList: TrailerItem[] = [];
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  selectedTrailer: TrailerItem | null = null;
  openTrailerModal = false;
  safeYoutubeUrl: SafeResourceUrl | null = null;

  currentPage = 0;
  slidesPerView = 4;

  swiperInstance!: Swiper;
  isBeginning: boolean = true;
  isEnd: boolean = false;
  config: SwiperOptions = {
    slidesPerView: this.slidesPerView,
    spaceBetween: 30,
    navigation: {
      nextEl: '.custom-carousel-btn--next',
      prevEl: '.custom-carousel-btn--prev',
    },
    loop: false,
    pagination: false,
    scrollbar: false,
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 10 },
      640: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 20 },
      1280: { slidesPerView: 4, spaceBetween: 30 },
    },
  };

  get totalPagesArray(): number[] {
    return Array.from({
      length: Math.ceil(this.trailerList.length / this.slidesPerView),
    }).map((_, i) => i);
  }

  constructor(private sanitizer: DomSanitizer) {}

  handleOnPlayTrailer(trailer: TrailerItem): void {
    this.selectedTrailer = trailer;
    this.safeYoutubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      trailer.youtubeUrl
    );

    this.openTrailerModal = true;
  }

  closeModal(): void {
    this.selectedTrailer = null;
    this.safeYoutubeUrl = null;
    this.openTrailerModal = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Check trailer', changes['trailerList']);
  }

  ngAfterViewInit(): void {
    if (this.swiper) {
      this.swiperInstance = this.swiper.swiperRef;
      // Delay update để Swiper có thể tính toán isEnd đúng
      setTimeout(() => {
        this.updateNavigationState();
      }, 0);
    }
  }

  onSwiper(swiper: Swiper) {
    this.swiperInstance = swiper;
    this.currentPage = swiper.realIndex || 0;
    setTimeout(() => {
      this.updateNavigationState();
    }, 0);
  }

  onSlideChange() {
    this.updateNavigationState();
    if (this.swiper) {
      const index = this.swiper.swiperRef.activeIndex;
      this.currentPage = Math.floor(index / this.slidesPerView);
    }
  }

  goToSlide(pageIndex: number) {
    const targetIndex = pageIndex * this.slidesPerView;
    this.swiper?.swiperRef.slideTo(targetIndex, 300);
  }

  slideNext() {
    const currentIndex = this.swiperInstance.activeIndex;
    const nextIndex = currentIndex + this.slidesPerView;
    const maxIndex = this.swiperInstance.slides.length - 1;

    this.swiperInstance.slideTo(
      Math.min(nextIndex, maxIndex),
      500 // speed
    );
    this.updateNavigationState();
  }

  slidePrev() {
    const currentIndex = this.swiperInstance.activeIndex;
    const prevIndex = currentIndex - this.slidesPerView;

    this.swiperInstance.slideTo(Math.max(prevIndex, 0), 500);
    this.updateNavigationState();
  }

  updateNavigationState() {
    if (!this.swiperInstance) return;
    this.isBeginning = this.swiperInstance.isBeginning;
    this.isEnd = this.swiperInstance.isEnd;
  }
}
