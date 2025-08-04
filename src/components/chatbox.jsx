import { useState, useEffect } from "react";
import supabase from "../supabase/supabase-client";
import { useAuth } from "../context/AuthContext";
import { FaPaperPlane, FaUser, FaRobot } from "react-icons/fa";

export default function Chatbox({ data }) {
    const { session } = useAuth();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");

    // Carica i messaggi esistenti
    useEffect(() => {
        if (data?.id) {
            loadMessages();

            // Sottoscrizione per messaggi in tempo reale
            const channel = supabase
                .channel('messages')
                .on('postgres_changes',
                    { event: '*', schema: 'public', table: 'messages' },
                    (payload) => {
                        if (payload.eventType === 'INSERT' && payload.new.game_id === data.id) {
                            setMessages(prev => [...prev, payload.new]);
                        }
                    }
                )
                .subscribe();

            return () => {
                supabase.removeChannel(channel);
            };
        }
    }, [data?.id]);

    const loadMessages = async () => {
        if (!data?.id) {
    
            return;
        }

        try {
            const { data: messagesData, error } = await supabase
                .from('messages')
                .select('*')
                .eq('game_id', data.id)
                .order('updated_at', { ascending: true });

            if (error) {
                console.error('Errore nel caricamento dei messaggi:', error);
            } else {
                setMessages(messagesData || []);
            }
        } catch (error) {
            console.error('Errore nel caricamento dei messaggi:', error);
        }
    };

    const handleMessageSubmit = async (event) => {
        event.preventDefault();

        if (!session?.user?.id) {
            alert("Devi essere loggato per inviare messaggi");
            return;
        }

        if (!newMessage.trim()) return;

        setLoading(true);

        try {
            const { error } = await supabase
                .from("messages")
                .insert([{
                    profile_id: session.user.id,
                    profile_username: session.user.user_metadata?.username || 'Utente',
                    game_id: data.id,
                    content: newMessage.trim()
                }]);

            if (error) {
                console.error('Errore nell\'invio del messaggio:', error);
                alert('Errore nell\'invio del messaggio');
            } else {
                setNewMessage("");
            }
        } catch (error) {
            console.error('Errore nell\'invio del messaggio:', error);
            alert('Errore nell\'invio del messaggio');
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString('it-IT', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="bg-base-100 rounded-box shadow-lg border border-base-300">
            {/* Header della chat */}
            <div className="bg-primary text-primary-content p-4 rounded-t-box">
                <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                        <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                            <span className="text-xs">🎮</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold">Gamers Chat</h3>
                        <p className="text-xs opacity-80">
                            {data?.name ? `Discussione su ${data.name}` : 'Chat di gioco'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Area messaggi */}
            <div className="h-96 overflow-y-auto p-4 space-y-4 bg-base-200">
                {messages.length === 0 ? (
                    <div className="text-center py-8">
                        <div className="avatar placeholder mb-4">
                            <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                                <span className="text-lg">💬</span>
                            </div>
                        </div>
                        <h4 className="font-semibold text-base-content mb-2">Nessun messaggio ancora</h4>
                        <p className="text-sm text-base-content/60">
                            Inizia la conversazione! 🚀
                        </p>
                    </div>
                ) : (
                    messages.map((message) => {
                        const isOwnMessage = message.profile_id === session?.user?.id;

                        return (
                            <div key={message.id} className={`chat ${isOwnMessage ? 'chat-end' : 'chat-start'}`}>
                                <div className="chat-image avatar">
                                    <div className="w-8 rounded-full bg-neutral-focus text-neutral-content">
                                        {isOwnMessage ? (
                                            <FaUser className="w-4 h-4" />
                                        ) : (
                                            <FaRobot className="w-4 h-4" />
                                        )}
                                    </div>
                                </div>
                                <div className="chat-bubble bg-base-300 text-base-content">
                                    <div className="font-medium text-xs mb-1">
                                        {message.profile_username}
                                    </div>
                                    <div className="text-sm">
                                        {message.content}
                                    </div>
                                </div>
                                <div className="chat-footer opacity-50 text-xs">
                                    {formatTime(message.updated_at)}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Form per inviare messaggi */}
            <div className="p-4 bg-base-100 border-t border-base-300">
                <form onSubmit={handleMessageSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Scrivi un messaggio..."
                        className="input input-bordered text-black  flex-1"
                        disabled={loading || !session?.user?.id}
                    />
                    <button
                        type="submit"
                        disabled={loading || !newMessage.trim() || !session?.user?.id}
                        className="btn btn-primary btn-square"
                    >
                        {loading ? (
                            <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                            <FaPaperPlane className="w-4 h-4" />
                        )}
                    </button>
                </form>

                {!session?.user?.id && (
                    <div className="alert alert-warning mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <span>Devi essere loggato per inviare messaggi</span>
                    </div>
                )}
            </div>
        </div>
    );
}