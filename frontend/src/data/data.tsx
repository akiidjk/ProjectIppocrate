import Image from "next/image"
import Link from "next/link";


export const globeConfig = {
    pointSize: 4,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };
  const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
  export const sampleArcs = [
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 1,
      startLat: 28.6139,
      startLng: 77.209,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -1.303396,
      endLng: 36.852443,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: -15.785493,
      startLng: -47.909029,
      endLat: 36.162809,
      endLng: -115.119411,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: -33.8688,
      startLng: 151.2093,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: 21.3099,
      startLng: -157.8581,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: 11.986597,
      startLng: 8.571831,
      endLat: -15.595412,
      endLng: -56.05918,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: -34.6037,
      startLng: -58.3816,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 48.8566,
      endLng: -2.3522,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 5,
      startLat: 14.5995,
      startLng: 120.9842,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 5,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: -33.8688,
      endLng: 151.2093,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 5,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 48.8566,
      endLng: -2.3522,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 6,
      startLat: -15.432563,
      startLng: 28.315853,
      endLat: 1.094136,
      endLng: -63.34546,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 6,
      startLat: 37.5665,
      startLng: 126.978,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 6,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 7,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -15.595412,
      endLng: -56.05918,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 7,
      startLat: 48.8566,
      startLng: -2.3522,
      endLat: 52.52,
      endLng: 13.405,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 7,
      startLat: 52.52,
      startLng: 13.405,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 8,
      startLat: -8.833221,
      startLng: 13.264837,
      endLat: -33.936138,
      endLng: 18.436529,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 8,
      startLat: 49.2827,
      startLng: -123.1207,
      endLat: 52.3676,
      endLng: 4.9041,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 8,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 9,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 9,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 9,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: -34.6037,
      endLng: -58.3816,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 10,
      startLat: -22.9068,
      startLng: -43.1729,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 10,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 31.2304,
      endLng: 121.4737,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 10,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 52.3676,
      endLng: 4.9041,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 11,
      startLat: 41.9028,
      startLng: 12.4964,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 11,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 31.2304,
      endLng: 121.4737,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 11,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 1.3521,
      endLng: 103.8198,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 12,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 37.7749,
      endLng: -122.4194,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 12,
      startLat: 35.6762,
      startLng: 139.6503,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 12,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 13,
      startLat: 52.52,
      startLng: 13.405,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 13,
      startLat: 11.986597,
      startLng: 8.571831,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 13,
      startLat: -22.9068,
      startLng: -43.1729,
      endLat: -34.6037,
      endLng: -58.3816,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 14,
      startLat: -33.936138,
      startLng: 18.436529,
      endLat: 21.395643,
      endLng: 39.883798,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
  ];


  export const subject_list = [
    {
      title: "Cambiamenti moderni nel concetto di salute",
      description:
        "Nella società moderna, la salute non è più solo l'assenza di malattia, ma include il benessere fisico, mentale e sociale. Questo cambiamento si riflette nei nuovi approcci alla promozione della salute rispetto anche al passato, come stili di vita sani e attenzione alla salute mentale. La tecnologia supporta questo cambiamento, offrendo strumenti per monitorare e migliorare la salute. C'è anche una maggiore consapevolezza dell'importanza della salute ambientale e della sostenibilità. In sintesi, la salute oggi mira al benessere completo delle persone e delle comunità.",
      content: (
        <Link href={"/pages/italianoestoria"}>
          <div className="h-full w-full flex items-center justify-center color-white image-container">
            <Image
              src="/italiano-storia.jpg"
              className="h-full w-full"
              alt="linear board demo"
              fill={true}
            />
          </div>
        </Link>
      ),
    },
    {
      title: "Ipertermia",
      description:
        "L'ipertermia è una tecnica terapeutica che sfrutta il riscaldamento del corpo o di specifiche aree per trattare diverse condizioni mediche. Questo trattamento può essere utilizzato in vari contesti, tra cui il cancro, in cui l'ipertermia può migliorare l'efficacia della radioterapia o della chemioterapia. Inoltre, viene studiata anche per il trattamento di patologie infiammatorie e dolorose. L'ipertermia può essere applicata localmente o in tutto il corpo e può coinvolgere diverse modalità, come il riscaldamento esterno o interno tramite dispositivi ad onde elettromagnetiche o ultrasuoni.",
      content: (
        <Link href={"/pages/telecomunicazioni"}>
        <div className="h-full w-full bg-red flex items-center justify-center text-white">
          <Image
            src="/cellule.webp"
            fill={true}
            className="h-full w-full object-cover"
            alt="linear board demo"
          />
        </div>
        </Link>
      ),
    },
    {
      title: "L'Istat: stile di vita e salute",
      description:
        "L'Istituto Nazionale di Statistica (Istat) svolge un ruolo fondamentale nell'analisi dello stile di vita e della salute della popolazione italiana. Attraverso indagini demografiche, sondaggi e raccolte dati, l'Istat fornisce una panoramica dettagliata sui comportamenti, le abitudini e le condizioni di salute della società italiana. Queste informazioni sono cruciali per comprendere le tendenze di lungo termine, identificare i fattori di rischio e sviluppare politiche sanitarie mirate a migliorare il benessere della popolazione.",
      content: (
        <Link href={"/pages/matematica"}>
        <div className="h-full w-full bg-black flex items-center justify-center text-white">
          <Image
            src="/istat.jpg"
            fill={true}
            className="h-full w-full"
            alt="linear board demo"
          />
        </div>
        </Link>
      ),
    },
    {
      title: "IoMT",
      description:
        "Internet of Medical Things rappresenta l'applicazione di dispositivi e tecnologie connessi in rete nel settore sanitario. Questi dispositivi, consentono la raccolta, la trasmissione e l'analisi di dati clinici in tempo reale. L'IoMT offre numerosi vantaggi, tra cui il monitoraggio remoto dei pazienti, la gestione efficiente delle cure, la diagnosi precoce delle malattie e la personalizzazione dei trattamenti. Tuttavia, comporta anche sfide legate alla sicurezza dei dati, alla privacy e alla regolamentazione rivoluzionando il sistema sanitario.",
      content: (
        <Link href={"/pages/tps"}>
        <div className="h-full w-full bg-black flex items-center justify-center text-white">
            <Image
            src="/iomt.jpg"
            fill={true}
            className="h-full w-full object-cover"
            alt="linear board demo"
          />
        </div>
        </Link>
      ),
    },
    {
      title: "IOT",
      description:
        "Internet of Things, è una rete di dispositivi fisici, veicoli, elettrodomestici e altri oggetti incorporati con sensori, software e connettività di rete che consentono loro di raccogliere e scambiare dati. Questi dispositivi comunicano tra loro e con altri sistemi attraverso internet, consentendo una vasta gamma di applicazioni in diversi settori, inclusi il monitoraggio ambientale, la sicurezza domestica, la gestione delle risorse energetiche e la salute digitale. L'IoT sta rivoluzionando la nostra vita quotidiana e il modo in cui interagiamo con il mondo circostante.",
      content: (
        <Link href={"/pages/sistemi"}>
        <div className="h-full w-full bg-black flex items-center justify-center text-white">
            <Image
            src="/iot.jpg"
            fill={true}
            className="h-full w-full object-cover"
            alt="linear board demo"
          />
        </div>
        </Link>
      ),
    },
    {
      title: "Religione e Salute",
      description:
        "Il rapporto tra identità religiosa e diritto alla salute solleva questioni complesse che riguardano la libertà di credo e l'accesso alle cure mediche. Mentre la religione può influenzare le decisioni riguardanti la salute, inclusa la scelta di cure mediche, vi sono situazioni in cui le pratiche religiose possono entrare in conflitto con le cure mediche standard o con i diritti alla salute di individui e comunità. Questo solleva domande e porta a dialoghi etici e legali riguardanti il bilanciamento tra le credenze religiose e la tutela della salute pubblica.",
      content: (
        <Link href={"/pages/religione"}>
        <div className="h-full w-full bg-black flex items-center justify-center text-white">
          <Image
            src="/religione.jpg"
            fill={true}
            className="h-full w-full object-cover"
            alt="linear board demo"
          />
        </div>
        </Link>
      ),
    },
    {
      title: "Dipendenze",
      description:
        "Le dipendenze rappresentano un complesso problema che può influenzare diverse aree della vita di un individuo, inclusa la salute fisica e mentale, le relazioni interpersonali e il funzionamento quotidiano. Queste dipendenze possono assumere molte forme, come dipendenza da sostanze, comportamenti compulsivi come il gioco d'azzardo o l'uso eccessivo di tecnologia, e dipendenze comportamentali come l'alimentazione incontrollata. Affrontare le dipendenze richiede un approccio multifacetico che coinvolga la prevenzione, la consapevolezza, il trattamento e il sostegno sociale.",
      content: (
        <Link href={"/pages/educazionefisica"}>
        <div className="h-full w-full bg-black flex items-center justify-center text-white">
            <Image
            src="/Dipendenze.jpg"
            fill={true}
            className="h-full w-full object-cover"
            alt="linear board demo"
          />
        </div>
        </Link>
      ),
    },
    {
      title: "Comparing countries",
      description:
        "In the Italian Constitution, the concept of health and well-being is mainly enshrined in Article 32, which establishes the right to health protection as a fundamental social right and commits to guarantee health care for all citizens and emphasises the principle of social solidarity in health protection. In Anglo-Saxon countries, the concept of health and well-being often reflects a broader perspective that includes not only access to medical care, but also individual responsibility for one's own health. This perspective emphasises the importance of a healthy lifestyle, disease prevention and health education and how health systems can vary greatly from country to country.",
      content: (
        <Link href={"/pages/inglese"}>
        <div className="h-full w-full bg-black flex items-center justify-center text-white">
            <Image
            src="/inglese.jpg"
            fill={true}
            className="h-full w-full object-cover"
            alt="linear board demo"
          />
        </div>
        </Link>
      ),
    },
    {
      title: "Sicurezza informatica",
      description:
        "Le fonti digitali rappresentano una fonte inestimabile di informazioni nell'era moderna, consentendo un accesso senza precedenti a una vasta gamma di contenuti. Tuttavia, questa facilità di accesso può anche comportare rischi significativi. Uno di questi rischi è rappresentato dalle fake news, informazioni false o fuorvianti che possono essere diffuse rapidamente attraverso le piattaforme digitali. La lotta alle fake news è diventata una sfida critica per individui, istituzioni e piattaforme online. È necessario adottare strategie efficaci per identificare, contrastare e ridurre la diffusione di informazioni ingannevoli.",
        content: (
          <Link href={"/pages/informatica"}>
          <div className="h-full w-full bg-black flex items-center justify-center text-white">
              <Image
              src="/sicurezza-informatica.jpg"
              fill={true}
              className="h-full w-full object-cover"
              alt="linear board demo"
            />
          </div>
          </Link>
        ),
    },
  ];


