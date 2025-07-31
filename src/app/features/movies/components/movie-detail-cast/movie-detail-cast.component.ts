import { MovieService } from 'src/app/features/movies/services/movie.service';
import { Component, OnInit } from '@angular/core';
import { Cast } from '@features/movies/models/credit.model';
import { finalize, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '@core/services/loading.service';

@Component({
  selector: 'app-movie-detail-cast',
  templateUrl: './movie-detail-cast.component.html',
  styleUrls: ['./movie-detail-cast.component.scss'],
})
export class MovieDetailCastComponent implements OnInit {
  castList!: Cast[];
  movieId: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id');
  }
}
