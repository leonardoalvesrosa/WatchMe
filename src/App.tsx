import { useCallback, useEffect, useState } from 'react';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import { IGenre } from './interfaces/Genre';
import { IMovie } from './interfaces/Movie';
import { api } from './services/api';

import './styles/global.scss';
import './styles/sidebar.scss';
import './styles/content.scss';


export function App() {

  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<IGenre>({} as IGenre);
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [movies, setMovies] = useState<IMovie[]>([]);

  const handleClickButton = useCallback((id: number) => {
    setSelectedGenreId(id);
  }, []);

  useEffect(() => {
    async function fetchGenres() {
      const { data } = await api.get<IGenre[]>('/genres');
      setGenres(data);
    }

    fetchGenres()
  }, [])

  useEffect(() => {
    async function fetchMoviesByGenre() {
      const { data } = await api.get<IMovie[]>(
        `movies/?Genre_id=${selectedGenreId}`
      )
      setMovies(data);
    }

    async function fetchGenre() {
      const { data } = await api.get<IGenre>(`genres/${selectedGenreId}`);
      setSelectedGenre(data);
    }

    fetchMoviesByGenre();
    fetchGenre();
  }, [selectedGenreId])


  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>

      <SideBar
        genres={genres}
        selectedGenreId={selectedGenreId}
        buttonClickCallback={handleClickButton}
      />

      <Content
        selectedGenre={selectedGenre}
        movies={movies}
      />

    </div>
  )
}