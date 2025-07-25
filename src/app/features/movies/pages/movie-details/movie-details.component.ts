import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { ActivatedRoute } from '@angular/router';
import { finalize, Observable, Subject, takeUntil } from 'rxjs';
import { MovieDetail } from '../../models/movie.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  id: string | null = null;
  movie: MovieDetail | null = null;
  constructor(
    private movieService: MovieService,
    private loadingService: LoadingService,
    private route: ActivatedRoute
  ) {}
  private destroy$ = new Subject<void>(); // Subject để quản lý hủy đăng ký

  ngOnInit(): void {
    // this.route.queryParams.subscribe((params) => {
    //   console.log('Chekc params', params);
    //   this.id = params['id'];
    // });
    // this.route.parent?.params.subscribe((params) => {
    //   console.log('Parent route params:', params);
    // });
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadMovieDetails();
  }

  loadMovieDetails(): void {
    this.loadingService.show();
    this.movieService
      .getMovieDetails(this.id as string)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loadingService.hide();
        })
      )
      .subscribe({
        next: (res) => {
          this.movie = res;
          console.log('check res', res);
        },
        error: (err) => {
          console.log('Error fetching trailers', err);
        },
      });
  }
}
