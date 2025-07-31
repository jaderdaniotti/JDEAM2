import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function ChangePasswordModal({ isOpen, onClose }) {
  const { updatePassword } = useAuth();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

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
    setMessage({ type: '', text: '' });

    // Validazione
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Le nuove password non coincidono' });
      setIsLoading(false);
      return;
    }

    if (formData.newPassword.length < 8) {
      setMessage({ type: 'error', text: 'La nuova password deve essere di almeno 8 caratteri' });
      setIsLoading(false);
      return;
    }

    try {
      const result = await updatePassword(formData.currentPassword, formData.newPassword);
      if (result.error) {
        setMessage({ type: 'error', text: result.error.message });
      } else {
        setMessage({ type: 'success', text: 'Password aggiornata con successo!' });
        setTimeout(() => {
          onClose();
          setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
          setMessage({ type: '', text: '' });
        }, 2000);
      }
    } catch {
      setMessage({ type: 'error', text: 'Errore durante l\'aggiornamento della password' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setMessage({ type: '', text: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-bianco rounded-2xl shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-scuro">Cambia Password</h3>
          <button
            onClick={handleClose}
            className="text-scuro-2 hover:text-scuro transition-colors"
          >
            <i className="bi bi-x-lg text-xl"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {message.text && (
            <div className={`mb-4 p-3 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-100 border border-green-400 text-green-700' 
                : 'bg-red-100 border border-red-400 text-red-700'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-scuro mb-2">
                Password Attuale *
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-scuro-2 focus:outline-none focus:border-scuro transition-colors"
                placeholder="Inserisci la password attuale"
              />
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-scuro mb-2">
                Nuova Password *
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-scuro-2 focus:outline-none focus:border-scuro transition-colors"
                placeholder="Inserisci la nuova password"
              />
              <p className="text-xs text-scuro-2 mt-1">
                Minimo 8 caratteri, una maiuscola, una minuscola e un numero
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-scuro mb-2">
                Conferma Nuova Password *
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-scuro-2 focus:outline-none focus:border-scuro transition-colors"
                placeholder="Conferma la nuova password"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-scuro text-chiaro px-4 py-3 rounded-lg font-medium hover:bg-scuro-2 transition-colors disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-chiaro mr-2"></div>
                    Aggiornando...
                  </div>
                ) : (
                  'Aggiorna Password'
                )}
              </button>
              
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 bg-gray-200 text-scuro px-4 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Annulla
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 