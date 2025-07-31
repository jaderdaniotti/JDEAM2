import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ButtonNormal from "../components/buttons/ButtonNormal";
import Avatar from "../components/Avatar";

export default function Profile() {
  const navigate = useNavigate();
  const { session, loading, signOut, getUserData, updateAvatar } = useAuth();

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
                
                <div className="space-y-3">
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
                {/* <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left" onClick={() => navigate("/profile/edit")}>
                  <div className="flex flex-col justify-center items-center gap-2">
                    <i className="bi bi-key text-2xl text-blue-500 mr-3"></i>
                    <div>
                      <p className="font-semibold text-center">Categorie</p>
                      <p className="text-sm text-scuro-2">Aggiorna sicurezza</p>
                    </div>
                  </div>
                </button>
                
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <div className="flex flex-col justify-center items-center gap-2">
                    <i className="bi bi-bell text-2xl text-orange-500 mr-3"></i>
                    <div>
                      <p className="font-semibold text-center">Notifiche</p>
                      <p className="text-sm text-scuro-2">Gestisci preferenze</p>
                    </div>
                  </div>
                </button> */}
                
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
          </div>
        </div>
      </div>
    </section>
  );
} 