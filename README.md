# JDEAM 2 - Gaming Platform

Una piattaforma gaming completa costruita con React, Vite, Tailwind CSS, DaisyUI e Supabase per l'autenticazione e il database.

## 📋 Indice

1. [Panoramica del Progetto](#panoramica-del-progetto)
2. [Tecnologie Utilizzate](#tecnologie-utilizzate)
3. [Struttura del Progetto](#struttura-del-progetto)
4. [Setup e Installazione](#setup-e-installazione)
5. [Configurazione Supabase](#configurazione-supabase)
6. [Architettura dell'Applicazione](#architettura-dellapplicazione)
7. [Componenti Principali](#componenti-principali)
8. [Funzionalità Implementate](#funzionalità-implementate)
9. [API Integration](#api-integration)
10. [Database Schema](#database-schema)
11. [Deployment](#deployment)

## 🎯 Panoramica del Progetto

JDEAM 2 è una piattaforma gaming che permette agli utenti di:
- Esplorare una vasta libreria di giochi tramite RAWG API
- Registrarsi e autenticarsi con Supabase
- Aggiungere giochi ai preferiti
- Partecipare a chat in tempo reale per ogni gioco
- Visualizzare dettagli completi dei giochi
- Gestire il proprio profilo utente

## 🛠 Tecnologie Utilizzate

### Frontend
- **React 18** - Framework JavaScript per l'interfaccia utente
- **Vite** - Build tool veloce per lo sviluppo
- **Tailwind CSS** - Framework CSS utility-first
- **DaisyUI** - Component library per Tailwind CSS
- **React Router DOM** - Routing per applicazioni React
- **React Icons** - Libreria di icone

### Backend & Database
- **Supabase** - Backend-as-a-Service per autenticazione e database
- **PostgreSQL** - Database relazionale (gestito da Supabase)
- **RAWG API** - API per dati dei videogiochi

### Autenticazione
- **Supabase Auth** - Sistema di autenticazione completo
- **JWT Tokens** - Gestione sessioni utente

## 📁 Struttura del Progetto

```
JDEAM 2/
├── public/
│   ├── favicon.png
│   ├── immagini/
│   │   ├── LINGUAGGI/
│   │   └── sfondo.png
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── buttons/
│   │   │   ├── ButtonNormal.jsx
│   │   │   └── ButtonUI.jsx
│   │   ├── games/
│   │   │   ├── FilterGames.jsx
│   │   │   ├── Games.jsx
│   │   │   └── SearchBar.jsx
│   │   ├── home/
│   │   │   ├── Categories.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── header.jsx
│   │   │   ├── LastGames.jsx
│   │   │   ├── Newsletter.jsx
│   │   │   ├── Stats.jsx
│   │   │   └── Testimonials.jsx
│   │   ├── logo/
│   │   │   └── Jdeam.jsx
│   │   ├── Avatar.jsx
│   │   ├── AvatarDisplay.jsx
│   │   ├── CardGames.jsx
│   │   ├── ChangePasswordModal.jsx
│   │   ├── chatbox.jsx
│   │   ├── Footer.jsx
│   │   ├── LazyLoadGameImage.jsx
│   │   ├── loader.jsx
│   │   ├── Navbar.jsx
│   │   └── ToggleFavorite.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── FavoritesContext.js
│   │   ├── FavoritesProvider.jsx
│   │   ├── GameFilterContext.jsx
│   │   ├── SessionContext.js
│   │   └── SessionProvider.jsx
│   ├── lib/
│   │   └── validationForm.js
│   ├── pages/
│   │   ├── CategoriesPage.jsx
│   │   ├── CategoryPage.jsx
│   │   ├── Contact.jsx
│   │   ├── GameDetail.jsx
│   │   ├── GamesPage.jsx
│   │   ├── home.jsx
│   │   ├── Login.jsx
│   │   ├── Privacy.jsx
│   │   ├── Profile.jsx
│   │   ├── ProfileEdit.jsx
│   │   ├── Register.jsx
│   │   ├── Terms.jsx
│   ├── supabase/
│   │   └── supabase-client.js
│   ├── App.css
│   ├── App.jsx
│   ├── gsapScroll.js
│   ├── index.css
│   └── main.jsx
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🚀 Setup e Installazione

### Prerequisiti
- Node.js (versione 16 o superiore)
- npm o yarn
- Account Supabase

### Passi di Installazione

1. **Clona il repository**
```bash
git clone <repository-url>
cd JDEAM-2
```

2. **Installa le dipendenze**
```bash
npm install
```

3. **Configura le variabili d'ambiente**
Crea un file `.env` nella root del progetto:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_RAWG_API_KEY=your_rawg_api_key
```

4. **Avvia il server di sviluppo**
```bash
npm run dev
```

## 🔧 Configurazione Supabase

### 1. Creazione Progetto Supabase

1. Vai su [supabase.com](https://supabase.com)
2. Crea un nuovo progetto
3. Salva l'URL e la chiave anonima

### 2. Configurazione Database

#### Tabella `favorites`
```sql
CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  game_id INTEGER NOT NULL,
  game_name TEXT,
  game_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Abilita RLS (Row Level Security)
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Policy per permettere agli utenti di vedere solo i propri preferiti
CREATE POLICY "Users can view own favorites" ON favorites
  FOR SELECT USING (auth.uid() = user_id);

-- Policy per permettere agli utenti di inserire i propri preferiti
CREATE POLICY "Users can insert own favorites" ON favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy per permettere agli utenti di eliminare i propri preferiti
CREATE POLICY "Users can delete own favorites" ON favorites
  FOR DELETE USING (auth.uid() = user_id);
```

#### Tabella `messages`
```sql
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  profile_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  profile_username TEXT,
  game_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Abilita RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policy per permettere a tutti di vedere i messaggi
CREATE POLICY "Anyone can view messages" ON messages
  FOR SELECT USING (true);

-- Policy per permettere agli utenti autenticati di inserire messaggi
CREATE POLICY "Authenticated users can insert messages" ON messages
  FOR INSERT WITH CHECK (auth.uid() = profile_id);
```

### 3. Configurazione Autenticazione

1. Vai su Authentication > Settings
2. Configura i provider di autenticazione (Email/Password)
3. Imposta le URL di redirect per il tuo dominio

## 🏗 Architettura dell'Applicazione

### Pattern Architetturale

L'applicazione segue il pattern **Context + Hooks** di React:

1. **Context Providers** - Gestiscono lo stato globale
2. **Custom Hooks** - Logica riutilizzabile
3. **Componenti** - UI riutilizzabili
4. **Pages** - Viste complete

### Flusso dei Dati

```
User Action → Component → Hook → Context → Supabase → Database
     ↑                                                      ↓
     ← Component ← Hook ← Context ← Supabase ← Database ←
```

## 🧩 Componenti Principali

### 1. Context Providers

#### AuthContext.jsx
Gestisce l'autenticazione globale dell'applicazione.

**Funzioni principali:**
- `useAuth()` - Hook per accedere al contesto di autenticazione
- `signUp(userData)` - Registrazione utente
- `signIn(email, password)` - Login utente
- `signOut()` - Logout utente
- `updateProfile(profileData)` - Aggiornamento profilo
- `updateAvatar(filePath)` - Aggiornamento avatar
- `updatePassword(newPassword)` - Cambio password

**Stato gestito:**
- `session` - Sessione utente corrente
- `user` - Dati utente
- `loading` - Stato di caricamento

#### FavoritesProvider.jsx
Gestisce i giochi preferiti dell'utente.

**Funzioni principali:**
- `getFavorites()` - Carica i preferiti dell'utente
- `addFavorites(gameId, gameData)` - Aggiunge un gioco ai preferiti
- `removeFavorite(gameId)` - Rimuove un gioco dai preferiti

**Stato gestito:**
- `favorites` - Array dei giochi preferiti

### 2. Componenti di Autenticazione

#### Login.jsx
Pagina di login con validazione form.

**Funzionalità:**
- Validazione email e password
- Gestione errori di autenticazione
- Redirect automatico dopo login
- Loading state durante l'autenticazione

#### Register.jsx
Pagina di registrazione con validazione completa.

**Validazioni implementate:**
- Email valida
- Password con requisiti minimi
- Username con caratteri validi
- Nome e cognome obbligatori

**Schema di validazione (Zod):**
```javascript
const userSchema = z.object({
  email: z.string().email("Email non valida"),
  password: z.string()
    .min(8, "La password deve avere almeno 8 caratteri")
    .regex(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*/, 
           "La password deve contenere almeno una lettera maiuscola, una minuscola e un numero"),
  firstName: z.string().min(2, "Il nome deve avere almeno 2 caratteri"),
  lastName: z.string().min(2, "Il cognome deve avere almeno 2 caratteri"),
  username: z.string()
    .min(3, "Lo username deve avere almeno 3 caratteri")
    .regex(/^[a-zA-Z0-9_]+$/, "Lo username può contenere solo lettere, numeri e underscore")
});
```

### 3. Componenti di Navigazione

#### Navbar.jsx
Barra di navigazione principale con:
- Logo e menu di navigazione
- Ricerca giochi
- Menu utente con avatar
- Funzioni di logout

#### Footer.jsx
Footer dell'applicazione con:
- Link di navigazione
- Informazioni di contatto
- Link social

### 4. Componenti di Gioco

#### CardGames.jsx
Card per visualizzare i giochi nella griglia principale.

**Props:**
- `game` - Oggetto con i dati del gioco
- `onClick` - Callback per click sul gioco

**Funzionalità:**
- Lazy loading delle immagini
- Hover effects
- Informazioni essenziali del gioco

#### ToggleFavorite.jsx
Componente per aggiungere/rimuovere giochi dai preferiti.

**Props:**
- `gameId` - ID del gioco
- `gameData` - Dati completi del gioco (opzionale)

**Funzionalità:**
- Toggle stato preferito
- Animazioni icona cuore
- Gestione errori di database

#### GameDetail.jsx
Pagina dettagliata di un singolo gioco.

**Sezioni principali:**
- Header con immagine di sfondo e informazioni base
- Descrizione completa
- Screenshot del gioco
- Caratteristiche e tag
- Requisiti di sistema
- Rating e valutazioni
- Store disponibili
- Informazioni sviluppatori
- Statistiche del gioco
- Chat in tempo reale

### 5. Componenti di Chat

#### chatbox.jsx
Sistema di chat in tempo reale per ogni gioco.

**Funzionalità:**
- Caricamento messaggi esistenti
- Invio nuovi messaggi
- Real-time updates tramite Supabase subscriptions
- Distinzione messaggi propri/altrui
- Formattazione timestamp
- Gestione stati di loading
- Validazione utente autenticato

**Stato gestito:**
- `messages` - Array dei messaggi
- `loading` - Stato di caricamento
- `newMessage` - Testo del nuovo messaggio

**Integrazione Supabase:**
```javascript
// Sottoscrizione real-time
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
```

### 6. Componenti di Profilo

#### Profile.jsx
Dashboard utente con gestione profilo.

**Sezioni principali:**
- Informazioni account
- Gestione avatar
- Cambio password
- Lista giochi preferiti
- Statistiche utente

#### ProfileEdit.jsx
Form di modifica profilo utente.

**Funzionalità:**
- Modifica dati personali
- Upload avatar
- Validazione form
- Salvataggio in Supabase

### 7. Componenti di Ricerca e Filtri

#### SearchBar.jsx
Barra di ricerca giochi con autocompletamento.

**Funzionalità:**
- Ricerca in tempo reale
- Debouncing delle query
- Integrazione RAWG API
- Gestione stati di loading

#### FilterGames.jsx
Filtri avanzati per i giochi.

**Filtri disponibili:**
- Piattaforma
- Genere
- Rating
- Anno di rilascio
- Ordinamento

#### Games.jsx
Container principale per la visualizzazione dei giochi.

**Funzionalità:**
- Griglia responsive
- Paginazione
- Integrazione filtri
- Gestione stati di caricamento

### 8. Componenti Home

#### header.jsx
Header della pagina home con hero section.

#### Categories.jsx
Sezione categorie principali.

#### Features.jsx
Sezione caratteristiche della piattaforma.

#### LastGames.jsx
Ultimi giochi aggiunti.

#### Stats.jsx
Statistiche della piattaforma.

#### Testimonials.jsx
Testimonianze utenti.

#### Newsletter.jsx
Iscrizione newsletter.

## 🔌 API Integration

### RAWG API

L'applicazione utilizza RAWG API per ottenere i dati dei videogiochi.

**Endpoint principali utilizzati:**

1. **Lista Giochi**
```
GET https://api.rawg.io/api/games?key={API_KEY}&page={page}&page_size={size}
```

2. **Dettagli Gioco**
```
GET https://api.rawg.io/api/games/{id}?key={API_KEY}
```

3. **Categorie/Generi**
```
GET https://api.rawg.io/api/genres?key={API_KEY}
```

4. **Giochi per Categoria**
```
GET https://api.rawg.io/api/games?key={API_KEY}&genres={genre_slug}
```

**Gestione API:**
- Rate limiting
- Error handling
- Loading states
- Caching dei risultati

### Supabase API

**Autenticazione:**
```javascript
// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email, password
});

// Registrazione
const { data, error } = await supabase.auth.signUp({
  email, password,
  options: { data: { username, first_name, last_name } }
});
```

**Database Operations:**
```javascript
// Inserimento preferiti
const { data, error } = await supabase
  .from('favorites')
  .insert([{ user_id, game_id, game_name, game_image }]);

// Caricamento preferiti
const { data, error } = await supabase
  .from('favorites')
  .select('*')
  .eq('user_id', userId);

// Inserimento messaggi
const { data, error } = await supabase
  .from('messages')
  .insert([{ profile_id, profile_username, game_id, content }]);
```

## 🗄 Database Schema

### Tabella `favorites`
```sql
CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  game_id INTEGER NOT NULL,
  game_name TEXT,
  game_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Campi:**
- `id` - Chiave primaria auto-increment
- `user_id` - Riferimento all'utente (UUID)
- `game_id` - ID del gioco da RAWG API
- `game_name` - Nome del gioco (cached)
- `game_image` - URL immagine del gioco (cached)
- `created_at` - Timestamp creazione
- `updated_at` - Timestamp ultimo aggiornamento

### Tabella `messages`
```sql
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  profile_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  profile_username TEXT,
  game_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Campi:**
- `id` - Chiave primaria auto-increment
- `profile_id` - Riferimento all'utente (UUID)
- `profile_username` - Username dell'utente
- `game_id` - ID del gioco per cui è il messaggio
- `content` - Contenuto del messaggio
- `created_at` - Timestamp creazione
- `updated_at` - Timestamp ultimo aggiornamento

## 🚀 Deployment

### Preparazione per il Production

1. **Build dell'applicazione**
```bash
npm run build
```

2. **Test del build**
```bash
npm run preview
```

3. **Deployment su Vercel**
```bash
npm install -g vercel
vercel
```

### Variabili d'Ambiente Production

Assicurati di configurare le seguenti variabili d'ambiente:

```env
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_supabase_anon_key
VITE_RAWG_API_KEY=your_rawg_api_key
```

### Ottimizzazioni Production

1. **Code Splitting** - Implementato automaticamente da Vite
2. **Lazy Loading** - Componenti caricati on-demand
3. **Image Optimization** - Lazy loading delle immagini
4. **Bundle Analysis** - Analisi delle dimensioni del bundle

## 🔧 Configurazione Tailwind CSS

### Custom Colors
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'scuro': '#1a1a1a',
        'scuro-2': '#2d2d2d',
        'chiaro': '#f5f5f5',
        'chiaro-2': '#e5e5e5',
        'bianco': '#ffffff'
      }
    }
  }
}
```

### DaisyUI Configuration
```javascript
// tailwind.config.js
module.exports = {
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
    darkTheme: "light",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root"
  }
}
```

## 🧪 Testing

### Test Manuali

1. **Autenticazione**
   - Registrazione nuovo utente
   - Login con credenziali valide
   - Logout
   - Gestione errori di autenticazione

2. **Funzionalità Giochi**
   - Navigazione tra le pagine
   - Ricerca giochi
   - Filtri avanzati
   - Visualizzazione dettagli gioco

3. **Sistema Preferiti**
   - Aggiunta gioco ai preferiti
   - Rimozione dai preferiti
   - Visualizzazione lista preferiti
   - Sincronizzazione tra dispositivi

4. **Chat System**
   - Invio messaggi
   - Visualizzazione messaggi in tempo reale
   - Gestione utenti non autenticati
   - Filtro messaggi per gioco

5. **Profilo Utente**
   - Modifica dati personali
   - Upload avatar
   - Cambio password
   - Gestione sessione

### Test di Performance

1. **Lighthouse Audit**
   - Performance: 90+
   - Accessibility: 95+
   - Best Practices: 90+
   - SEO: 85+

2. **Bundle Analysis**
   - Bundle size ottimizzato
   - Code splitting implementato
   - Lazy loading funzionante

## 🐛 Troubleshooting

### Problemi Comuni

1. **Errore Supabase Connection**
   - Verifica URL e chiave API
   - Controlla configurazione RLS
   - Verifica policies del database

2. **RAWG API Rate Limit**
   - Implementa caching
   - Gestisci errori 429
   - Ottimizza chiamate API

3. **Real-time Chat non funziona**
   - Verifica subscription Supabase
   - Controlla configurazione channel
   - Verifica policies messages table

4. **Problemi di Autenticazione**
   - Verifica configurazione Auth
   - Controlla redirect URLs
   - Verifica email templates

## 📈 Roadmap Future

### Funzionalità Pianificate

1. **Sistema di Recensioni**
   - Rating utenti
   - Recensioni testuali
   - Sistema di moderazione

2. **Social Features**
   - Amici e seguaci
   - Condivisione preferiti
   - Feed attività

3. **Notifiche**
   - Notifiche push
   - Email notifications
   - In-app notifications

4. **Mobile App**
   - React Native
   - PWA optimization
   - Offline support

5. **Analytics**
   - User behavior tracking
   - Game popularity metrics
   - Performance monitoring



**Sviluppato con ❤️ da Jader!**
