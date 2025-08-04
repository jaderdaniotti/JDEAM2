import { useCallback, useEffect, useState } from "react";
import supabase from "../supabase/supabase-client";
import { useAuth } from "./AuthContext";
import FavoritesContext from "./FavoritesContext";

export default function FavoritesProvider({ children }) {
    const { session } = useAuth();
    const [favorites, setFavorites] = useState([]);

    const getFavorites = useCallback(async () => {
        let { data: favourites, error } = await supabase
            .from("favorites")
            .select("*")
            .eq("user_id", session?.user.id);
        if (error) {
            // Handle error silently
        } else {
            setFavorites(favourites);
        }
    }, [session]);

    const addFavorites = async (gameId, gameData = null) => {
        if (!session?.user?.id) {
            alert("Devi essere loggato per aggiungere ai preferiti");
            return;
        }
        
        const { data, error } = await supabase
            .from("favorites")
            .insert([
                {
                    user_id: session.user.id,
                    game_id: gameId,
                    game_name: gameData?.name || null,
                    game_image: gameData?.background_image || null,
                },
            ])
            .select();
            
        if (error) {
            alert(error.message);
        } else {
            setFavorites(prev => [...prev, ...data]);
        }
    };

    const removeFavorite = async (gameId) => {
        if (!session?.user?.id) {
            alert("Devi essere loggato per rimuovere dai preferiti");
            return;
        }
        
        const { error } = await supabase
            .from("favorites")
            .delete()
            .eq("game_id", gameId)
            .eq("user_id", session.user.id);
            
        if (error) {
            alert(error.message);
        } else {
            setFavorites(prev => prev.filter(fav => fav.game_id !== gameId));
        }
    };

    useEffect(() => {
        if (session) {
            getFavorites()
        }
        const favorites = supabase
            .channel("favorites")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "favorites" },
                () => getFavorites()
            )
            .subscribe();

        return () => {
            if (favorites) {
                supabase.removeChannel(favorites);
            }
            favorites.unsubscribe();
        };
    }, [getFavorites, session]);
    
    return (
        <FavoritesContext.Provider value={{
            favorites,
            addFavorites,
            setFavorites,
            removeFavorite,
        }}>
            {children}
        </FavoritesContext.Provider>
    )
}