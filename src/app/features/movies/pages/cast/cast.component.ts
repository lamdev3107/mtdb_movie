import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '@core/services/loading.service';
import { Cast, Crew } from '@features/movies/models/credit.model';
import { Movie, MovieDetail } from '@features/movies/models/movie.model';
import { MovieService } from '@features/movies/services/movie.service';
import { finalize, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.scss'],
})
export class CastComponent implements OnInit {
  movieId: string | null = null;
  movie: MovieDetail | null = null;
  casts: Cast[] = [];
  crewByDepartment: Crew[] = [];
  private destroy$ = new Subject<void>(); // Subject để quản lý hủy đăng

  constructor(
    private movieService: MovieService,
    public loadingService: LoadingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.movieId = params.get('id');
      this.loadMovieCredits(this.movieId);
      this.loadMovieDetails(this.movieId);
    });
    this.loadMovieCredits(this.movieId);
  }
  loadMovieDetails(movieId: string | null): void {
    this.loadingService.show();
    this.movieService
      .getMovieDetails(Number(movieId))
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.loadingService.hide();
        })
      )
      .subscribe({
        next: (res) => {
          this.movie = res;
          console.log('check movie', this.movie);
        },
        error: (err) => {
          console.log('Error fetching trailers', err);
        },
      });
  }

  loadMovieCredits(movieId: string | null) {
    this.loadingService.show();

    this.movieService
      .getMovieCredits(Number(movieId))
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loadingService.hide()) // luôn hide loading dù success hay error
      )
      .subscribe({
        next: (res) => {
          this.casts = res.cast;
          this.groupCrewByDepartment(res.crew);
          console.log('Check ', this.crewByDepartment);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  private groupCrewByDepartment(crew: Crew[]) {
    this.crewByDepartment = crew.reduce((acc: any, member: any) => {
      const dept = member.department;
      if (!acc[dept]) acc[dept] = [];
      acc[dept].push(member);
      return acc;
    }, {});
  }
}
