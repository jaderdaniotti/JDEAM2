import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ButtonNormal from "../components/buttons/ButtonNormal";
import Avatar from "../components/Avatar";
import ChangePasswordModal from "../components/ChangePasswordModal";

export default function ProfileEdit() {
  const navigate = useNavigate();
  const { session, loading, getUserData, updateProfile, updateAvatar } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    avatarUrl: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  useEffect(() => {
    if (session && !loading) {
      const userData = getUserData();
      if (userData) {
        setFormData({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          username: userData.username || "",
          email: userData.email || "",
          avatarUrl: userData.avatarUrl || ""
        });
      }
    }
  }, [session, loading, getUserData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const result = await updateProfile(formData);
      if (result.error) {
        setMessage({ type: "error", text: result.error.message });
      } else {
        setMessage({ type: "success", text: "Profilo aggiornato con successo!" });
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      }
    } catch {
      setMessage({ type: "error", text: "Errore durante l'aggiornamento del profilo" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpload = async (event, filePath) => {
    const result = await updateAvatar(filePath);
    if (result.error) {
      setMessage({ type: "error", text: "Errore durante l'aggiornamento dell'avatar" });
    } else {
      setMessage({ type: "success", text: "Avatar aggiornato con successo!" });
    }
  };

  const handleOpenPasswordModal = () => {
    setIsPasswordModalOpen(true);
  };

  const handleClosePasswordModal = () => {
    setIsPasswordModalOpen(false);
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
          <p className="mb-6">Devi effettuare il login per modificare il tuo profilo.</p>
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

  return (
    <section className="min-h-screen flex items-center justify-center bg-chiaro text-scuro px-5 py-8">
      <div className="bg-bianco p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Modifica Profilo</h2>
          <button
            onClick={() => navigate("/profile")}
            className="text-scuro-2 hover:text-scuro transition-colors"
          >
            <i className="bi bi-x-lg text-2xl"></i>
          </button>
        </div>

        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${message.type === "success"
              ? "bg-green-100 border border-green-400 text-green-700"
              : "bg-red-100 border border-red-400 text-red-700"
            }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-8">
            <Avatar
              url={formData.avatarUrl}
              size={96}
              onUpload={handleAvatarUpload}
              className="mb-4"
            />
            <p className="text-sm text-scuro-2">Clicca per cambiare avatar</p>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-scuro mb-2">
                Nome *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-scuro-2 focus:outline-none focus:border-scuro transition-colors"
                placeholder="Inserisci il tuo nome"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-scuro mb-2">
                Cognome *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-scuro-2 focus:outline-none focus:border-scuro transition-colors"
                placeholder="Inserisci il tuo cognome"
              />
            </div>
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-scuro mb-2">
              Username *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-scuro-2">@</span>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full pl-8 pr-4 py-3 rounded-lg border border-scuro-2 focus:outline-none focus:border-scuro transition-colors"
                placeholder="username"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-scuro mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-scuro-2 mt-1">L'email non può essere modificata</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <ButtonNormal
              type="submit"
              bg="bg-scuro"
              text={isLoading ? "Salvando..." : "Salva Modifiche"}
              color="text-chiaro"
              disabled={isLoading}
            >
            </ButtonNormal>

            <ButtonNormal
              type="button"
              onClick={() => navigate("/profile")}
              bg="bg-gray-200"
              text="Annulla"
              color="text-scuro"
            >
            </ButtonNormal>
          </div>
        </form>

        {/* Additional Options */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Altre Opzioni</h3>
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleOpenPasswordModal}
              className="w-full text-left p-3 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Cambia Password</p>
                  <p className="text-sm text-red-500">Aggiorna la tua password di sicurezza</p>
                </div>
                <i className="bi bi-chevron-right"></i>
              </div>
            </button>

          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={handleClosePasswordModal}
      />
    </section>
  );
} 