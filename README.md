# ProjectIppocrate 🏛️

## Index 📇

1. [Introduzione](#introduzione) 💫

    - [Panoramica del Progetto](#panoramica-del-progetto)
    - [Obiettivi](#obiettivi)
    - [Contesto nell'ambito dell'Agenda 2030](#contesto-nell-ambito-dell-agenda-2030)

2. [Struttura del Progetto](#struttura-del-progetto) 🌲

    - [Architettura Generale](#archittetura-generale)
    - [Diagrammi di Architettura](#diagrammi-di-architettura)

3. [Setup e Installazione](#setup-e-installazione) 💻

    - [Requisiti di Sistema](#requisiti-di-sistema)
    - [Installazione](#installazione)

4. [Frontend](#frontend) 🙍‍♂️

    - [Tecnologie Utilizzate](#tecnologie-e-librerie-utilizzate)
    - [Componenti Principali](#componenti-principali)
    - [Routing e Navigazione](#routing-e-navigazione)
    - [Gestione dello Stato](#gestione-dello-stato)

5. [Backend](#backend) 🧠

    - [Tecnologie Utilizzate](#tecnologie-utilizzate-1)
    - [Middleware Utilizzati](#middleware)
    - [Sicurezza](#sicurezza-autenticazione-e-autorizzazione) (Autenticazione e Autorizzazione)

6. [Database](#database) 🫙

    - [Tecnologie Utilizzate](#tecnologie-utilizzate-2)
    - [Struttura dei Dati](#la-struttura-dei-dati)
    - [Configurazione di Redis](#configurazione-di-redis)
  
7. [Deployment](#deployment) 🚝

    - [Preparazione all'Ambiente di Produzione](#ambiente-di-produzione)
    - [Configurazione Docker](#configurazione)
    - [Monitoraggio e Logging](#monitoraggio-e-logging)

8. [Benchmark](#benchmark) 🧪

9. [Crediti](#crediti) 📈

## Introduzione

### Panoramica del progetto

Il progetto nasce come lavoro finale dell'anno scolastico 2023/24 nell'ambito dell'educazione civica. Quest'anno abbiamo deciso di utilizzare nuove tecnologie e linguaggi per sperimentare e metterci alla prova con un approccio innovativo e non convenzionale, con l'obiettivo di replicare un mini [CMS](https://www.ibm.com/topics/content-management-system).

### Obiettivi

L'obiettivo era quello di adottare un approccio diverso e stimolante, mettendo alla prova non solo le abilità individuali ma anche quelle di gruppo, cercando di lavorare in modo efficiente e rapido.

### Contesto nell' ambito dell agenda 2030

Gli obiettivi di sviluppo sostenibile (OSS) sono una serie di 17 obiettivi interconnessi, definiti dall'Organizzazione delle Nazioni Unite come strategia "per ottenere un futuro migliore e più sostenibile per tutti". In particolare, quest'anno ci siamo occupati dell'Obiettivo 3 dell'Agenda, che riguarda la salute e il benessere di ogni essere umano.

### Perchè Project Ippocrate?

Abbiamo scelto questo nome per due motivi:

- Semplicità (il nome è più corto di "Educazione civica obiettivo Salute e Benessere").
- Ippocrate fu autore degli Aforismi, opera che Dante, come tutto il suo tempo, considerava la base dell'apprendimento della medicina e considerava la medicina una scienza basata su un metodo razionale di diagnosi e terapia.

## Struttura del Progetto

### Archittetura generale

Il progetto è diviso in tre macro componenti:

- **Frontend**: Si occupa della parte client e estetica (e non solo).
- **Backend**: Gestisce la comunicazione tra il frontend e il database, inclusa l'autenticazione.
- **Database**: Contiene tutte le informazioni necessarie al funzionamento.

### Diagrammi di Architettura

(Diagrammi di architettura dovrebbero essere inclusi qui)

### Cosa lo rende diverso da un normale sito?

Uno degli aspetti innovativi di questo progetto è la capacità di creare pagine dinamicamente tramite un pannello di amministrazione. Questa funzionalità offre una flessibilità notevole rispetto ai siti web tradizionali, consentendo agli amministratori di:

- Creare nuove pagine
- Modificare pagine esistenti
- Rimuovere pagine non più necessarie

Il processo non si limita a passare semplici JSON tra il frontend e il backend. Quando un amministratore invia una richiesta POST per creare una pagina, il backend effettua un processo di trasformazione e pre-compilazione dei dati. Questo significa che:

- I dati della pagina vengono elaborati e trasformati in strutture ben definite.
- Vengono applicate le classi CSS corrette e altre configurazioni stilistiche.
- Utilizzando la potenza di Rust, queste trasformazioni sono altamente efficienti, riducendo il carico di lavoro del frontend e migliorando le prestazioni complessive del sito.

### Flusso di Creazione delle Pagine

1. Richiesta di Creazione: L'amministratore invia una richiesta POST tramite il pannello di controllo, fornendo i dati necessari per la nuova pagina.
2. Elaborazione del Backend: Il backend, scritto in Rust, riceve la richiesta e avvia il processo di trasformazione:
   - Valida i dati ricevuti.
   - Applica le trasformazioni necessarie per pre-compilare i contenuti.
   - Associa le classi CSS e altri elementi stilistici.
3. Salvataggio nel Database: I dati trasformati vengono salvati nel database Redis, utilizzando chiavi specifiche per facilitarne il recupero.
4. Recupero e Visualizzazione: Quando un utente richiede la nuova pagina, il backend recupera i dati pre-compilati da Redis e li invia al frontend, che li visualizza immediatamente senza ulteriori elaborazioni.

### Vantaggi dell'Architettura

- Efficienza: La pre-compilazione dei dati riduce il carico di lavoro del frontend, rendendo l'applicazione più reattiva.
- Flessibilità: Gli amministratori possono gestire il contenuto del sito in tempo reale, senza dover modificare il codice sorgente.
- Scalabilità: Utilizzando Rust e Redis, l'applicazione è progettata per gestire grandi volumi di dati e richieste simultanee, garantendo alte prestazioni anche sotto carico.
Questa architettura innovativa consente di sfruttare appieno le potenzialità di Rust, combinando la velocità e la sicurezza di un linguaggio di basso livello con la flessibilità di un framework di frontend moderno come NextJS.


## Setup e Installazione

### Requisiti di Sistema

- Docker
- Qualsiasi sistema operativo (OS)

### Installazione

L'installazione del progetto è molto semplice, basta avere Docker installato sulla propria macchina:

- [Installazione Windows](https://www.docker.com/products/docker-desktop/)
- [Installazione Linux](https://docs.docker.com/engine/install/ubuntu/)

Successivamente, copiare il progetto sul proprio disco tramite git con il comando `git clone https://github.com/akiidjk/ProjectIppocrate.git`o scaricare la cartella tramite questo [link](https://github.com/akiidjk/ProjectIppocrate/archive/refs/heads/main.zip). Una volta fatto ciò, entrare nella cartella appena scaricata tramite terminale e lanciare il comando  `docker compose up --build` o  `docker-compose up --build`.

Dopo aver eseguito questi passaggi, dirigersi su localhost:3000.

## Frontend

### Tecnologie Utilizzate

Per la creazione del frontend abbiamo utilizzato [NextJS](https://nextjs.org/) con Typescript, impiegando la libreria UI [shadcnUI](https://ui.shadcn.com/). Questa combinazione ci ha permesso di accelerare notevolmente i tempi di sviluppo del frontend. Per la creazione del design e la scelta dei colori, abbiamo utilizzato [Figma](https://www.figma.com/) per l'UI/UX e [Adobe Color](https://color.adobe.com/) per le palette colori.

Come [Javascript Runtime](https://www.freecodecamp.org/news/javascript-engine-and-runtime-explained/) e packet manager, invece di usare il semplice [Node](https://nodejs.org/en), abbiamo sperimentato con [Bun](https://bun.sh/), un JS Runtime scritto in Rust che velocizza notevolmente molte operazioni come il classico `npm install`.

Altre tecnologie utilizzate, incluse di default con NextJS, sono:

- [Tailwindcss](https://tailwindcss.com/) per lo styling.
- [Eslint](https://eslint.org/) per il linting del codice.
- [Postcss](https://postcss.org/) per la trasformazione dei CSS.

### Componenti principali

il frontend è diviso in due sezioni principali:

- **Parte Open**: Accessibile a tutti, questa sezione include le pagine con gli argomenti, la home page e altre pagine pubbliche.
- **Parte Closed**: Accessibile solo all'admin, questa sezione è dedicata alla creazione e alla manipolazione delle pagine. Tutti i componenti della parte closed sono racchiusi nella cartella Admin.

### Gestione dello Stato

- **Provider di Stato:** Gestione della sessione e dello stato locale delle pagine.
- **Autenticazione**: Modulo dedicato all'autenticazione dell'admin.
- **Comunicazioni con il Backend**: Modulo dedicato alle chiamate al backend.

### Routing e Navigazione

NextJS implementa di default un sistema di routing, eliminando la necessità di installare pacchetti esterni come [ReactRouter](https://reactrouter.com/en/main).

## Backend

### Tecnologie Utilizzate

Per il backend, abbiamo scelto di utilizzare [Rust](https://www.rust-lang.org/), un linguaggio di basso livello con una gestione della memoria particolarmente efficiente basata su [Ownership e Borrowing](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html). Rust è noto per la sua sicurezza e performance, rendendolo ideale per lo sviluppo di backend scalabili e performanti.

In particolare, abbiamo utilizzato il framework [Actix](https://actix.rs/), che ci ha permesso di creare una struttura modulare e scalabile per il nostro backend.

## Middleware

Il middleware implementato copre solo gli endpoint che richiedono modifiche al database o che gestiscono richieste POST. Non abbiamo inserito un middleware globale per la sicurezza contro possibili attacchi per una questione di tempo, ma può essere facilmente implementato in seguito.

In particolare, il middleware attuale verifica che l'utente sia autenticato e possieda un token di accesso generato durante il login. Ecco un esempio di middleware per l'autenticazione:

```rust
pub async fn validator(
    req: ServiceRequest,
    credentials: BearerAuth,
) -> Result<ServiceRequest, (Error, ServiceRequest)> {
    let jwt_secret: String = config::get_jwt_secret().to_string();
    let key: Hmac<Sha256> = Hmac::new_from_slice(jwt_secret.as_bytes()).unwrap();
    let token_string = credentials.token();

    let claims: Result<TokenClaims, &str> = token_string
        .verify_with_key(&key)
        .map_err(|_| "Invalid token");

    match claims {
        Ok(value) => {
            req.extensions_mut().insert(value);
            Ok(req)
        }
        Err(_) => {
            let config = req
                .app_data::<bearer::Config>()
                .cloned()
                .unwrap_or_default()
                .scope("");

            Err((AuthenticationError::from(config).into(), req))
        }
    }
}

```

Questo middleware verifica la presenza del token di accesso nell'header Authorization delle richieste e valida il token prima di permettere l'accesso agli endpoint protetti.

### Sicurezza (Autenticazione e Autorizzazione)

L'autenticazione viene fatta tramite hash e alcune librerie esterne dedicate proprio a questa funzione succesivamente il nome utente con la password viene criptato e inserito nel DB che una fatto l'accesso viene decryptato confrontato e verificato

#### Tecnologie e Librerie Utilizzate

Per implementare il sistema di autenticazione, utilizziamo le seguenti tecnologie e librerie:

- **Argonautica**: Per l'hashing e la verifica delle password.
- **Hmac e Sha256**: Per la firma e la verifica dei token JWT.
- **JWT**: Per la gestione dei token di autenticazione.
- **Serde**: Per la serializzazione e deserializzazione dei dati.

La funzione `create_user` gestisce la creazione di un nuovo utente, hashando la password prima di salvarla nel database Redis.

La funzione `basic_auth` gestisce l'autenticazione dell'utente utilizzando l'autenticazione di base e generando un token JWT in caso di successo.

Il middleware `validator` verifica la validità del token JWT presente nelle richieste protette.

## Database

### Tecnologie utilizzate

Per il database, abbiamo scelto [Redis](https://redis.io/), una soluzione NoSQL con molteplici funzionalità. Redis può essere utilizzato come cache, database o persino come vector DB. Nel nostro caso, lo utilizziamo come un semplice database NoSQL per memorizzare dati strutturati e non strutturati.

### La struttura dei dati

Essendo Redis un database NoSQL, i dati sono organizzati in chiavi e valori. Abbiamo scelto di utilizzare un singolo cluster, con chiavi prefissate da stringhe specifiche per identificare facilmente i diversi tipi di dati memorizzati.

- **"auth/"**: Prefisso utilizzato per memorizzare gli utenti.
  - Esempio: "auth/admin"
- **"image-"**: Prefisso utilizzato per memorizzare le immagini.
  - Esempio: "image-nomeimmagine"

**Modello pagina:**

```json
{
    "id":"nomepagina",
    "page":{
        "title":"Titolo pagina",
        "paragraphs":[
            "title":"titolopragrafo",
            "content":"contenuto",
            "image_source":"endpoint image",
            "layout_type":1,
        ]
    }
    "time":"ora di crezione",
}

```

### Configurazione di Redis

Per configurare Redis, segui questi passaggi:

1. Configurazione del Cluster:

   - Sebbene stiamo utilizzando un singolo cluster, Redis supporta configurazioni più complesse. Per il nostro caso, un'installazione di default è sufficiente.

2. Connessione al Redis:

   - Utilizziamo la libreria deadpool-redis per gestire le connessioni a Redis nel nostro progetto.

## Deployment

### Ambiente di produzione

Per l'ambiente di produzione, abbiamo utilizzato [Railway](https://railway.app/), una piattaforma cloud che permette il deploy di applicazioni web e non solo. Railway offre una configurazione semplice e intuitiva per il deployment continuo, rendendo facile mantenere aggiornata l'applicazione.

### Configurazione

Abbiamo configurato il deployment utilizzando i file Docker presenti nei progetti. Collegando la repository a Railway, siamo in grado di sfruttare gli aggiornamenti automatici del codice.

**Configurazione Docker del frontend**

Il file Docker per il frontend utilizza Bun, un runtime JavaScript scritto in Rust, per migliorare la velocità delle operazioni.

```Docker
FROM oven/bun AS base

FROM base AS deps
WORKDIR /app

COPY package.json ./
RUN bun install --frozen-lockfile

FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN bun run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

RUN mkdir -p /app/.next/cache/images
RUN chown -R nextjs:bun /app/.next /app/node_modules

USER nextjs

CMD ["bun", "start", "--", "-H", "0.0.0.0","-p $PORT"]


```

**Configurazione Docker del backend:**

Il file Docker per il backend utilizza Rust per compilare e eseguire l'applicazione.

```Docker
FROM rust:1.77

WORKDIR /usr/src/backend
COPY . .

EXPOSE 8000

RUN apt-get update && \
    apt-get install -y clang llvm-dev libclang-dev && \
    rm -rf /var/lib/apt/lists/*

RUN cargo build --release

CMD ["./target/release/backend"]

```

## Monitoraggio e Logging

### Monitoraggio

Monitorare l'applicazione in produzione è fondamentale per garantire la disponibilità e le prestazioni. Railway offre strumenti integrati per il monitoraggio delle applicazioni distribuite. Inoltre, è possibile integrare ulteriori servizi di monitoraggio e allarme, come Prometheus e Grafana, per una visibilità più approfondita.

### Logging

Il logging è stato implementato principalmente per il backend durante la fase di sviluppo. In produzione, sono stati mantenuti solo i log critici relativi agli accessi agli endpoint e agli errori principali.


## Benchmark

Per testare le alte prestazioni del backend, abbiamo creato dei benchmark utilizzando [Locust](https://pypi.org/project/locust/), uno strumento open-source per il load testing che consente di simulare migliaia di utenti simultanei per valutare le performance dell'applicazione.

Configurazione dei Test di Carico
Nella cartella del backend sono presenti i file di configurazione di Locust e i report dei test eseguiti.

## Crediti

Il progetto è stato svolto dal gruppo:

- **Memoli Francesco**: Ha gestito il progetto e il gruppo, contribuendo sia al frontend (progettando il design e tutta la zona admin e dinamica) che al backend, occupandosi del sistema CDN delle immagini e dell'autenticazione dell'admin.
- **Giuseppe Pio Vicedomini**: Ha lavorato sulla parte frontend non destinata all'admin, sviluppando le pagine accessibili a tutti gli utenti.
- **Daniele Migliore**: Si è occupato della progettazione del backend, delle strutture dati e della pre-compilazione dell'HTML nel backend.
- **Rosario Viscardi**: Ha contribuito al recupero delle fonti e delle immagini, assicurandosi che tutti i materiali utilizzati fossero appropriati e di alta qualità.
- **Enrico Cipoletta**: Ha collaborato al recupero delle fonti e delle immagini, lavorando in tandem con Rosario per garantire l'integrità visiva del progetto.

❗ documentazione scritta da @akiidjk
