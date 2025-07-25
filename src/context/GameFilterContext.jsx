
import React, { createContext, useContext, useState } from 'react';

const GameFilterContext = createContext();

export function GameFilterProvider({ children }) {
  const [selectedGenre, setSelectedGenre] = useState("");
  
  return (
    <GameFilterContext.Provider value={{ selectedGenre, setSelectedGenre }}>
      {children}
    </GameFilterContext.Provider>
  );
}

export function useGameFilter() {
  return useContext(GameFilterContext);
}