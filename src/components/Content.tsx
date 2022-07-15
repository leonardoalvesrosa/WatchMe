import React, { memo, useCallback, useEffect, useState } from 'react';

import { MovieCard } from '../components/MovieCard';

import '../styles/content.scss';

import { IMovie } from '../interfaces/Movie';
import { IGenre } from '../interfaces/Genre';

interface ContentProps {
  selectedGenre: IGenre;
  movies: IMovie[];
}

export function ContentComponent({ selectedGenre, movies }: ContentProps) {

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )

}

export const Content = memo(ContentComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.movies, nextProps.movies)
})