import React, { memo, useCallback, useEffect, useState } from 'react';

import { api } from '../services/api';
import { Button } from '../components/Button';

import '../styles/sidebar.scss';
import { IGenre } from '../interfaces/Genre';

interface SideBarProps {
  genres: IGenre[];
  selectedGenreId: number;
  buttonClickCallback: (args: number) => void;
}


export function SideBarComponent({
  genres,
  selectedGenreId,
  buttonClickCallback
}: SideBarProps) {

  return (
    <>
      <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => buttonClickCallback(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>
      </nav>

    </>
  )
}


export const SideBar = memo(SideBarComponent);