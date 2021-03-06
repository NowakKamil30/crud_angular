import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Movie } from 'src/app/models/Movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  public movies: Movie[];
  public isLoading = true;
  public isError = false;
  public constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getMovies()
      .subscribe((movies: Movie[]) => {
        this.movies = movies;
        this.isLoading = false;
        this.isError = false;
      }, error => {
        this.isLoading = false;
        this.isError = true;
      });

      this.movieService.subject.subscribe(() => {
        console.log(222);
        
        this.movieService.getMovies()
        .subscribe((movies: Movie[]) => {
          this.movies = movies;
          this.isLoading = false;
          this.isError = false;
        }, error => {
          this.isLoading = false;
          this.isError = true;
        });
      })
  }

  public deleteById(id: number): void {
    this.movieService
    .deleteMovie(id)
      .subscribe(() => {
        this.movies = this.movies.filter((movie: Movie) => movie.id !== id);
      })
  }

}
