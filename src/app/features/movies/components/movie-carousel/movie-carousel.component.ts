import {
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
  SimpleChanges,
} from '@angular/core';
import { Movie } from 'src/app/features/movies/models/movie.model';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import Swiper from 'swiper';

@Component({
  selector: 'app-movie-carousel',
  templateUrl: './movie-carousel.component.html',
  styleUrls: ['./movie-carousel.component.scss'],
})
export class MovieCarouselComponent implements OnInit, AfterViewInit {
  @Input() movieList: Movie[] = [];
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  currentPage = 0;
  slidesPerView = 5;

  swiperInstance!: Swiper;
  isBeginning: boolean = true;
  isEnd: boolean = false;
  config: SwiperOptions = {
    slidesPerView: this.slidesPerView,
    spaceBetween: 40,
    navigation: {
      nextEl: '.custom-carousel-btn--next',
      prevEl: '.custom-carousel-btn--prev',
    },
    loop: false,
    pagination: false,
    scrollbar: false,
  };

  get totalPagesArray(): number[] {
    return Array.from({
      length: Math.ceil(this.movieList.length / this.slidesPerView),
    }).map((_, i) => i);
  }

  constructor() {}

  ngOnInit(): void {}

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
    console.log('Check isEnd', this.isEnd);
    console.log('Check isBeginning', this.isBeginning);
  }
}
