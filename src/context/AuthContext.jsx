import React, { createContext, useContext, useState, useEffect } from 'react';
import supabase from '../supabase/supabase-client';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {

        setSession(session);
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const getSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error);
        setSession(null);
        setUser(null);
      } else {

        setSession(data.session);
        setUser(data.session?.user || null);
      }
    } catch (error) {
      console.error('Unexpected error getting session:', error);
      setSession(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (userData) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            username: userData.username
          }
        }
      });

      if (error) {
        console.error('Sign up error:', error);
        return { error };
      } else {

        return { data };
      }
    } catch (error) {
      console.error('Unexpected sign up error:', error);
      return { error };
    }
  };

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Sign in error:', error);
        return { error };
      } else {

        return { data };
      }
    } catch (error) {
      console.error('Unexpected sign in error:', error);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
        return { error };
      } else {

        return { success: true };
      }
    } catch (error) {
      console.error('Unexpected sign out error:', error);
      return { error };
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          first_name: profileData.firstName,
          last_name: profileData.lastName,
          username: profileData.username,
          avatar_url: profileData.avatarUrl
        }
      });

      if (error) {
        console.error('Update profile error:', error);
        return { error };
      } else {

        // Refresh user data
        await getSession();
        return { success: true };
      }
    } catch (error) {
      console.error('Unexpected update profile error:', error);
      return { error };
    }
  };

  const updateAvatar = async (filePath) => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          avatar_url: filePath
        }
      });

      if (error) {
        console.error('Update avatar error:', error);
        return { error };
      } else {

        // Refresh user data
        await getSession();
        return { success: true };
      }
    } catch (error) {
      console.error('Unexpected update avatar error:', error);
      return { error };
    }
  };

  const updatePassword = async (currentPassword, newPassword) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        console.error('Update password error:', error);
        return { error };
      } else {

        return { success: true };
      }
    } catch (error) {
      console.error('Unexpected update password error:', error);
      return { error };
    }
  };

  const getUserData = () => {
    if (!user) return null;
    
    return {
      id: user.id,
      email: user.email,
      firstName: user.user_metadata?.first_name || 'Utente',
      lastName: user.user_metadata?.last_name || '',
      username: user.user_metadata?.username || 'username',
      avatarUrl: user.user_metadata?.avatar_url || null,
      createdAt: user.created_at,
      lastSignInAt: user.last_sign_in_at
    };
  };

  const value = {
    session,
    user,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    updateAvatar,
    updatePassword,
    getUserData,
    isAuthenticated: !!session
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
