import { useEffect, useState } from 'react';
import { Content } from './components/Content';
import { SideBar } from './components/SideBar';
import { api } from './services/api';

import './styles/global.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function App() {

  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
  
  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);


  return (
    <div style={{ display: 'flex' }}>
      <SideBar 
      handleClickButton={handleClickButton} 
      selectedGenreId={selectedGenreId}
       />
       
      <Content 
      selectedGenre={selectedGenre} 
      selectedGenreId={selectedGenreId}
      />
    </div>
  )
}