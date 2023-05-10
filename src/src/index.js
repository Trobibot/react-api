import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokeList from './pages/PokeList';
import PokeDetail from './pages/PokeDetail';
import { Box, Typography } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Box sx={{ minWidth: '500px', maxWidth: '800px', width: '60%', margin: 'auto', marginTop: '64px' }}>
    <Typography sx={{ textAlign: 'center', marginBottom: '64px' }} variant="h1">POKEDEX</Typography>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<PokeList />} />
        <Route path="pokemons/:id" element={<PokeDetail />} />
      </Routes>
    </BrowserRouter>
    </Box>
);
