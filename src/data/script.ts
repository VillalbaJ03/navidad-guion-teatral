import { Script, Character, Scene } from "@/types";

/**
 * Datos del guion teatral navideño cristiano
 * "La Navidad que el mundo olvidó… y volvió a recordar"
 */

// Definición de personajes con colores únicos para identificación visual
export const characters: Character[] = [
  { id: "narrador", name: "Narrador", actor: "Piedad", color: "#6b7280" },
  { id: "nina-amargada", name: "Niña Amargada", actor: "Katy", color: "#dc2626" },
  { id: "maria", name: "María", actor: "Odalis", color: "#3b82f6" },
  { id: "jose", name: "José", actor: "Mirian", color: "#854d0e" },
  { id: "jesus", name: "Jesús", actor: "Jenner", color: "#f59e0b" },
  { id: "anciana", name: "Anciana Consejera", actor: "Alison", color: "#7c3aed" },
  { id: "nina-llorona", name: "Niña Llorona", actor: "Yolanda", color: "#ec4899" },
  { id: "papa-noel", name: "Papá Noel", actor: "Zoila", color: "#16a34a" },
  { id: "angel", name: "Ángel", actor: "Danesa", color: "#eab308" },
];

// Escenas del guion
export const scenes: Scene[] = [
  {
    id: "escena-1",
    number: 1,
    title: "Una Navidad vacía",
    content: [
      {
        id: "e1-dir-1",
        type: "stage-direction",
        text: "Escenario con luces frías. Decoración navideña exagerada. Entra la Niña Amargada.",
      },
      {
        id: "e1-dial-1",
        characterId: "narrador",
        characterName: "Narrador",
        actor: "Piedad",
        lines: [
          "En un mundo lleno de luces, regalos y ruido,",
          "la Navidad se había vuelto algo muy distinto",
          "a lo que Dios planeó…",
        ],
      },
      {
        id: "e1-dial-2",
        characterId: "nina-amargada",
        characterName: "Niña Amargada",
        actor: "Katy",
        direction: "enojada",
        lines: [
          "¡Odio la Navidad!",
          "¡Todos corren, compran, gritan… y nadie es feliz!",
          "Regalos, fiestas, mentiras…",
          "¡Todo es una farsa!",
        ],
      },
      {
        id: "e1-dir-2",
        type: "stage-direction",
        text: "Patea una caja de regalos.",
      },
    ],
  },
  {
    id: "escena-2",
    number: 2,
    title: "La voz de la experiencia",
    content: [
      {
        id: "e2-dir-1",
        type: "stage-direction",
        text: "Entra la Anciana Consejera lentamente.",
      },
      {
        id: "e2-dial-1",
        characterId: "anciana",
        characterName: "Anciana Consejera",
        actor: "Alison",
        lines: ["Niña… ¿sabes por qué estás tan vacía?"],
      },
      {
        id: "e2-dial-2",
        characterId: "nina-amargada",
        characterName: "Niña Amargada",
        actor: "Katy",
        lines: ["Porque la Navidad es solo para gastar y aparentar."],
      },
      {
        id: "e2-dial-3",
        characterId: "anciana",
        characterName: "Anciana Consejera",
        actor: "Alison",
        lines: [
          "No…",
          "Estás vacía porque has olvidado",
          "a Quién celebramos.",
        ],
      },
    ],
  },
  {
    id: "escena-3",
    number: 3,
    title: "Un corazón triste",
    content: [
      {
        id: "e3-dir-1",
        type: "stage-direction",
        text: "Entra la Niña Llorona, sentada con un regalo vacío.",
      },
      {
        id: "e3-dial-1",
        characterId: "nina-llorona",
        characterName: "Niña Llorona",
        actor: "Yolanda",
        direction: "llorando",
        lines: [
          "Yo pedí muchos regalos…",
          "pero nadie jugó conmigo.",
          "Mi casa está llena de cosas",
          "y mi corazón está vacío.",
        ],
      },
      {
        id: "e3-dial-2",
        characterId: "nina-amargada",
        characterName: "Niña Amargada",
        actor: "Katy",
        lines: ["¿Ves?", "Eso es la Navidad de ahora…"],
      },
      {
        id: "e3-dial-3",
        characterId: "anciana",
        characterName: "Anciana Consejera",
        actor: "Alison",
        lines: [
          "No.",
          "Eso es lo que pasa",
          "cuando olvidamos el amor verdadero.",
        ],
      },
    ],
  },
  {
    id: "escena-4",
    number: 4,
    title: "La falsa alegría",
    content: [
      {
        id: "e4-dir-1",
        type: "stage-direction",
        text: "Entra Papá Noel alegre.",
      },
      {
        id: "e4-dial-1",
        characterId: "papa-noel",
        characterName: "Papá Noel",
        actor: "Zoila",
        lines: ["¡Jo, jo, jo!", "¡Feliz Navidad!", "¿Ya pensaron en los regalos?"],
      },
      {
        id: "e4-dial-2",
        characterId: "nina-amargada",
        characterName: "Niña Amargada",
        actor: "Katy",
        direction: "irónica",
        lines: ["Ah, claro…", 'Tú eres el dueño de la Navidad, ¿no?'],
      },
      {
        id: "e4-dial-3",
        characterId: "papa-noel",
        characterName: "Papá Noel",
        actor: "Zoila",
        direction: "serio",
        lines: ["No…", "Yo solo soy una tradición.", "La Navidad no me pertenece."],
      },
      {
        id: "e4-dir-2",
        type: "stage-direction",
        text: "Señala el cielo.",
      },
      {
        id: "e4-dial-4",
        characterId: "papa-noel",
        characterName: "Papá Noel",
        actor: "Zoila",
        lines: ["Pertenece al Rey", "que nació en humildad."],
      },
    ],
  },
  {
    id: "escena-5",
    number: 5,
    title: "El anuncio celestial",
    content: [
      {
        id: "e5-dir-1",
        type: "stage-direction",
        text: "Luces se apagan. Música suave. Entra el Ángel.",
      },
      {
        id: "e5-dial-1",
        characterId: "angel",
        characterName: "Ángel",
        actor: "Danesa",
        lines: [
          "¡No teman!",
          "Les traigo buenas noticias de gran gozo:",
          "Hoy, en la ciudad de David,",
          "les ha nacido un Salvador,",
          "que es Cristo el Señor.",
        ],
      },
      {
        id: "e5-dir-2",
        type: "stage-direction",
        text: "Luz dorada.",
      },
    ],
  },
  {
    id: "escena-6",
    number: 6,
    title: "El verdadero pesebre",
    content: [
      {
        id: "e6-dir-1",
        type: "stage-direction",
        text: "Escenario cambia a un pesebre sencillo. María y José están con Jesús.",
      },
      {
        id: "e6-dial-1",
        characterId: "maria",
        characterName: "María",
        actor: "Odalis",
        direction: "con ternura",
        lines: ["Este niño es un regalo para el mundo."],
      },
      {
        id: "e6-dial-2",
        characterId: "jose",
        characterName: "José",
        actor: "Mirian",
        lines: [
          "No nació entre riquezas,",
          "sino para darnos vida,",
          "esperanza y salvación.",
        ],
      },
      {
        id: "e6-dir-2",
        type: "stage-direction",
        text: "La Niña Amargada se acerca lentamente.",
      },
      {
        id: "e6-dial-3",
        characterId: "nina-amargada",
        characterName: "Niña Amargada",
        actor: "Katy",
        direction: "conmovida",
        lines: ["¿Todo esto…", "por amor?"],
      },
      {
        id: "e6-dial-4",
        characterId: "maria",
        characterName: "María",
        actor: "Odalis",
        lines: ["Sí.", "Por amor a ti,", "a mí,", "a todos."],
      },
      {
        id: "e6-dial-5",
        characterId: "jesus",
        characterName: "Jesús",
        actor: "Jenner",
        direction: "con voz dulce",
        lines: [
          "Yo nací por amor.",
          "Vine para sanar corazones",
          "y traer luz donde hay tristeza.",
        ],
      },
      {
        id: "e6-dial-6",
        characterId: "nina-llorona",
        characterName: "Niña Llorona",
        actor: "Yolanda",
        lines: ["¿También viniste por mí?"],
      },
      {
        id: "e6-dial-7",
        characterId: "jesus",
        characterName: "Jesús",
        actor: "Jenner",
        lines: ["Sí.", "Por ti…", "y por todos los que se sienten solos."],
      },
    ],
  },
  {
    id: "escena-7",
    number: 7,
    title: "El corazón transformado",
    content: [
      {
        id: "e7-dir-1",
        type: "stage-direction",
        text: "La Niña Amargada se arrodilla.",
      },
      {
        id: "e7-dial-1",
        characterId: "nina-amargada",
        characterName: "Niña Amargada",
        actor: "Katy",
        lines: [
          "Perdóname…",
          "Busqué la Navidad en cosas vacías",
          "y estaba aquí…",
          "en un pesebre.",
          "Hoy entiendo que la Navidad",
          "no es recibir regalos…",
          "es recibirte a Ti.",
        ],
      },
      {
        id: "e7-dial-2",
        characterId: "jesus",
        characterName: "Jesús",
        actor: "Jenner",
        lines: [
          "Cuando me recibes en tu corazón,",
          "la Navidad vive en ti",
          "todos los días.",
        ],
      },
    ],
  },
  {
    id: "escena-final",
    number: 8,
    title: "Mensaje al público",
    content: [
      {
        id: "ef-dir-1",
        type: "stage-direction",
        text: "Todos los personajes al frente del escenario.",
      },
      {
        id: "ef-dial-1",
        characterId: "angel",
        characterName: "Ángel",
        actor: "Danesa",
        lines: ["La Navidad es Cristo."],
      },
      {
        id: "ef-dial-2",
        characterId: "anciana",
        characterName: "Anciana Consejera",
        actor: "Alison",
        lines: ["Es recordar el amor verdadero."],
      },
      {
        id: "ef-dial-3",
        characterId: "papa-noel",
        characterName: "Papá Noel",
        actor: "Zoila",
        lines: ["Las tradiciones pasan…"],
      },
      {
        id: "ef-dial-4",
        characterId: "maria",
        characterName: "María y José",
        actor: "Odalis y Mirian",
        direction: "juntos",
        lines: ["Pero Jesús permanece para siempre."],
      },
      {
        id: "ef-dial-5",
        characterId: "nina-llorona",
        characterName: "Niña Llorona",
        actor: "Yolanda",
        direction: "feliz",
        lines: ["Hoy entendí que el mejor regalo", "es el amor de Jesús."],
      },
      {
        id: "ef-dial-6",
        characterId: "nina-amargada",
        characterName: "Niña Amargada",
        actor: "Katy",
        direction: "sonriendo",
        lines: [
          "Esta Navidad…",
          "mi corazón cambió",
          "porque Jesús nació también en mí.",
        ],
      },
      {
        id: "ef-dial-7",
        characterId: "jesus",
        characterName: "Jesús",
        actor: "Jenner",
        lines: [
          "Yo soy el regalo del Padre.",
          "Ábranme su corazón",
          "y nunca estarán solos.",
        ],
      },
    ],
  },
];

// Mensaje final del narrador
const finalMessage = {
  id: "mensaje-final",
  characterId: "narrador",
  characterName: "Narrador",
  actor: "Piedad",
  lines: [
    "La verdadera Navidad",
    "no está en lo que compramos,",
    "sino en a Quién recibimos.",
    "Jesús es el regalo eterno de Dios para la humanidad.",
  ],
};

// Guion completo
export const script: Script = {
  title: "La Navidad que el mundo olvidó… y volvió a recordar",
  subtitle: "Guion Teatral Navideño Cristiano",
  centralPhrase: "La Navidad no es lo que recibimos, sino a Quién recibimos.",
  characters,
  scenes,
  finalMessage,
};

// Exportar utilidad para obtener personaje por ID
export function getCharacterById(id: string): Character | undefined {
  return characters.find((c) => c.id === id);
}

// Exportar utilidad para obtener color de personaje
export function getCharacterColor(characterId: string): string {
  const character = getCharacterById(characterId);
  return character?.color ?? "#6b7280";
}
