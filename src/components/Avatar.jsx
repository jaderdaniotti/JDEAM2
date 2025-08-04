import { useEffect, useState } from 'react'
import supabase from '../supabase/supabase-client'

export default function Avatar({ url, size = 128, onUpload, className = "" }) {
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  const downloadImage = async (path) => {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    } catch (error) {
      
    }
  }

  const uploadAvatar = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Devi selezionare un\'immagine da caricare.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(event, filePath)
    } catch (error) {
      console.error('Errore durante il caricamento:', error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className={`relative ${className}`}>
      {avatarUrl ? (
        <div className="relative flex justify-center items-center">
          <img
            src={avatarUrl}
            alt="Avatar"
            className="rounded-full object-cover shadow-lg"
            style={{ 
              height: size, 
              width: size,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
            }}
          />
          <label 
            htmlFor="avatar-upload"
            className="absolute -bottom-2 -right-2 w-10 h-10 bg-scuro text-chiaro rounded-full flex items-center justify-center hover:bg-scuro-2 transition-colors shadow-lg cursor-pointer"
            title="Cambia avatar"
          >
            {uploading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-chiaro"></div>
            ) : (
              <i className="bi bi-camera text-lg"></i>
            )}
          </label>
        </div>
      ) : (
        <div className="relative">
          <div 
            className="rounded-full bg-gradient-to-br from-scuro to-scuro-2 flex items-center justify-center text-chiaro"
            style={{ 
              height: size, 
              width: size,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
            }}
          >
            <i className="bi bi-person-circle text-6xl"></i>
          </div>
          <label 
            htmlFor="avatar-upload"
            className="absolute -bottom-2 -right-2 w-10 h-10 bg-scuro text-chiaro rounded-full flex items-center justify-center hover:bg-scuro-2 transition-colors shadow-lg cursor-pointer"
            title="Carica avatar"
          >
            {uploading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-chiaro"></div>
            ) : (
              <i className="bi bi-camera text-lg"></i>
            )}
          </label>
        </div>
      )}
      
      <input
        type="file"
        id="avatar-upload"
        accept="image/*"
        onChange={uploadAvatar}
        disabled={uploading}
        className="hidden"
      />
    </div>
  )
} 