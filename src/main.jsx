import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { SavedMoviesProvider } from './Components/SavedMoviesContext.jsx';
import { FavoritesProvider } from './Components/FavoritesContext'; // Import the FavoritesProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SavedMoviesProvider>
      <FavoritesProvider>  
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FavoritesProvider>
    </SavedMoviesProvider>
  </StrictMode>
);
