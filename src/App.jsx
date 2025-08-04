
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';

import FavoritesProvider from './context/FavoritesProvider';
import Home from './pages/home'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import GameDetail from './pages/GameDetail';
import GamesPage from './pages/GamesPage';
import CategoryPage from './pages/CategoryPage';
import CategoriesPage from './pages/CategoriesPage';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';

function App() {
  return (
    <>
      <AuthProvider>
        <FavoritesProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/game/:id" element={<GameDetail />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/:categoryId" element={<CategoryPage />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            </Routes>
            <Footer />
            </BrowserRouter>
          </FavoritesProvider>
      </AuthProvider>
    </>
  )
}

export default App
