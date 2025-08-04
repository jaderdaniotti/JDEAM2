import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FavoritesContext from "../context/FavoritesContext";
import ButtonNormal from "../components/buttons/ButtonNormal";
import Avatar from "../components/Avatar";
import { FaTrashAlt } from "react-icons/fa";

export default function Profile() {
  const navigate = useNavigate();
  const { session, loading, signOut, getUserData, updateAvatar } = useAuth();
  const { favorites, removeFavorite } = useContext(FavoritesContext);
  const [gameDetails, setGameDetails] = useState({});

  // Funzione per recuperare i dettagli dei giochi mancanti
  const fetchGameDetails = async (gameId) => {
    if (gameDetails[gameId]) return; // Se già caricato, non ricaricare
    
    try {
      const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=fe79071ec2d64d9a8864d79740169bfd`);
      if (response.ok) {
        const data = await response.json();
        setGameDetails(prev => ({
          ...prev,
          [gameId]: {
            name: data.name,
            background_image: data.background_image
          }
        }));
      }
    } catch (error) {
      console.error(`Errore nel caricamento del gioco ${gameId}:`, error);
    }
  };

  // Carica i dettagli dei giochi che non hanno nome o immagine
  useEffect(() => {
    favorites.forEach(favorite => {
      if (!favorite.game_name || !favorite.game_image) {
        fetchGameDetails(favorite.game_id);
      }
    });
  }, [favorites]);

  const handleLogout = async () => {
    const result = await signOut();
    if (result.error) {
      //console.log("Errore durante il logout: " + result.error.message);
    } else {
      //console.log("Logout completato con successo! 👋");
      navigate("/");
    }
  };

  const handleAvatarUpload = async (event, filePath) => {
    const result = await updateAvatar(filePath);
    if (result.error) {
      //console.log("Errore durante l'aggiornamento dell'avatar: " + result.error.message);
    } else {
      //console.log("Avatar aggiornato con successo!");
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-chiaro text-scuro">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-scuro mx-auto mb-4"></div>
          <p>Caricamento...</p>
        </div>
      </section>
    );
  }

  if (!session) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-chiaro text-scuro">
        <div className="bg-bianco p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
          <h2 className="text-3xl font-bold mb-6">Accesso Richiesto</h2>
          <p className="mb-6">Devi effettuare il login per accedere al tuo profilo.</p>
          <button 
            onClick={() => navigate("/login")}
            className="bg-chiaro border-scuro border-2 text-scuro px-6 py-2 rounded-md hover:bg-scuro hover:text-chiaro transition-colors"
          >
            Vai al Login
          </button>
        </div>
      </section>
    );
  }

  const userData = getUserData();

  return (
    <section className="min-h-screen bg-chiaro-2 text-scuro py-8">
      <div className="max-w-4xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Area Personale</h1>
          <p className="text-scuro-2">Gestisci il tuo account e le tue preferenze</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-bianco rounded-2xl shadow-lg p-8">
              <div className="text-center">
                <div className="mb-6">
                  <Avatar 
                    url={userData?.avatarUrl}
                    size={128}
                    onUpload={handleAvatarUpload}
                    className="mx-auto"
                  />
                </div>
                
                <h2 className="text-2xl font-bold mb-2">
                  {userData?.firstName} {userData?.lastName}
                </h2>
                
                <div className="mt-2 flex flex-col gap-1">
                  <ButtonNormal 
                    link="/profile/edit"
                    bg="bg-scuro"
                    text="Modifica Profilo"
                    color="text-chiaro"
                  >
                  </ButtonNormal>
                  
                  <ButtonNormal 
                    onClick={handleLogout}
                    bg="bg-red-500 hover:bg-red-600"
                    text="Logout"
                    color="text-chiaro"
                  >
                  </ButtonNormal>
                </div>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Info Card */}
            <div className="bg-bianco rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <i className="bi bi-person-circle text-scuro mr-3"></i>
                Informazioni Personali
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                <div>
                  <label className="block text-sm font-medium text-scuro-2 mb-2">Nome</label>
                  <p className="text-md font-semibold">{userData?.firstName || 'Non specificato'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-scuro-2 mb-2">Cognome</label>
                  <p className="text-md font-semibold">{userData?.lastName || 'Non specificato'}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-scuro-2 mb-2">Username</label>
                  <p className="text-md font-semibold">@{userData?.username}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-scuro-2  mb-2">Email</label>
                  <p className="text-md font-semibold ">{userData?.email}</p>
                </div>
              </div>
            </div>

            {/* Account Details Card */}
            <div className="bg-bianco rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <i className="bi bi-shield-check text-scuro mr-3"></i>
                Dettagli Account
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-scuro-2 mb-2">ID Utente</label>
                  <p className="text-sm font-mono bg-gray-100 p-2 rounded">{userData?.id}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-scuro-2 mb-2">Stato Account</label>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <i className="bi bi-check-circle mr-2"></i>
                    Attivo
                  </span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-scuro-2 mb-2">Data Creazione</label>
                  <p className="text-lg font-semibold">
                    {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString('it-IT') : 'N/A'}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-scuro-2 mb-2">Ultimo Accesso</label>
                  <p className="text-lg font-semibold">
                    {userData?.lastSignInAt ? new Date(userData.lastSignInAt).toLocaleDateString('it-IT') : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-bianco rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <i className="bi bi-lightning text-scuro mr-3"></i>
                Azioni Rapide
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left" onClick={() => navigate("/profile/edit")}>
                  <div className="flex flex-col justify-center items-center gap-2">
                    <i className="bi bi-gear text-2xl text-gray-500 mr-3"></i>
                    <div>
                      <p className="font-semibold text-center">Impostazioni</p>
                      <p className="text-sm text-scuro-2">Configura account</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Favorites Card */}
            <div className="bg-bianco rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <i className="bi bi-heart-fill text-red-500 mr-3"></i>
                I Miei Preferiti
              </h3>
              
              {favorites.length === 0 ? (
                <div className="text-center py-8">
                  <i className="bi bi-heart text-4xl text-gray-300 mb-4"></i>
                  <p className="text-lg text-scuro-2 mb-2">Non hai ancora giochi preferiti</p>
                  <p className="text-sm text-scuro-3">Esplora i giochi e aggiungi i tuoi preferiti!</p>
                  <button 
                    onClick={() => navigate("/games")}
                    className="mt-4 bg-scuro text-chiaro px-6 py-2 rounded-lg hover:bg-scuro-2 transition-colors"
                  >
                    Esplora Giochi
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-scuro-2 mb-4">
                    Hai {favorites.length} {favorites.length === 1 ? 'gioco preferito' : 'giochi preferiti'}
                  </p>
                  
                                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                     {favorites.map((favorite) => {
                       const gameDetail = gameDetails[favorite.game_id];
                       const gameName = favorite.game_name || gameDetail?.name || 'Caricamento...';
                       const gameImage = favorite.game_image || gameDetail?.background_image || '/placeholder-game.jpg';
                       
                       return (
                         <div key={favorite.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
                           <div className="flex items-center justify-between mb-3">
                             <div className="flex items-center space-x-3">
                               <img 
                                 src={gameImage} 
                                 alt={gameName} 
                                 className="w-12 h-12 rounded-lg object-cover"
                                 onError={(e) => {
                                   e.target.src = '/placeholder-game.jpg';
                                 }}
                               />
                               <div>
                                 <h4 className="font-semibold text-scuro truncate">
                                   {gameName}
                                 </h4>
                                 <p className="text-sm text-scuro-2">ID: {favorite.game_id}</p>
                               </div>
                             </div>
                             
                             <button
                               onClick={() => removeFavorite(favorite.game_id)}
                               className="text-red-500 hover:text-red-700 transition-colors p-1"
                               title="Rimuovi dai preferiti"
                             >
                               <FaTrashAlt size={16} />
                             </button>
                           </div>
                           
                           <div className="flex space-x-2">
                             <button 
                               onClick={() => navigate(`/game/${favorite.game_id}`)}
                               className="flex-1 bg-scuro text-chiaro px-3 py-1 rounded text-sm hover:bg-scuro-2 transition-colors"
                             >
                               Vedi Dettagli
                             </button>
                           </div>
                         </div>
                       );
                     })}
                   </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 