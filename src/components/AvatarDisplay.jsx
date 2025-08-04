import { useEffect, useState } from 'react'
import supabase from '../supabase/supabase-client'

export default function AvatarDisplay({ url, size = 40, className = "" }) {
  const [avatarUrl, setAvatarUrl] = useState(null)

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

  if (avatarUrl) {
    return (
      <img 
        src={avatarUrl} 
        alt="avatar" 
        className={`rounded-full object-cover ${className}`}
        style={{ width: size, height: size }}
      />
    )
  }

  return (
    <i className={`bi bi-person-circle ${className}`} style={{ fontSize: size }}></i>
  )
} 