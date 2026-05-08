import { Routes, Route } from 'react-router-dom';
import { SearchPage } from './pages/SearchPage';
import { PokemonDetail } from './pages/PokemonDetail';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/pokemon/:permanentid" element={<PokemonDetail />} />
    </Routes>
  );
}
