/**
 * Tipos TypeScript para el guion teatral
 */

// Personaje con su actor asignado
export interface Character {
  id: string;
  name: string;
  actor: string;
  color: string; // Color para identificación visual
}

// Diálogo individual
export interface Dialogue {
  id: string;
  characterId: string;
  characterName: string;
  actor: string;
  direction?: string; // Indicación escénica (ej: "enojada", "con ternura")
  lines: string[]; // Cada línea del diálogo
}

// Acotación escénica
export interface StageDirection {
  id: string;
  type: "stage-direction";
  text: string;
}

// Elemento de contenido de escena (puede ser diálogo o acotación)
export type SceneContent = Dialogue | StageDirection;

// Escena completa
export interface Scene {
  id: string;
  number: number;
  title: string;
  content: SceneContent[];
}

// Guion completo
export interface Script {
  title: string;
  subtitle?: string;
  centralPhrase: string;
  characters: Character[];
  scenes: Scene[];
  finalMessage: Dialogue;
}

// Estado para el modo ensayo
export interface RehearsalState {
  selectedCharacterId: string | null;
  currentLineIndex: number;
}

// Estado para búsqueda
export interface SearchState {
  query: string;
  results: SearchResult[];
}

export interface SearchResult {
  sceneId: string;
  sceneNumber: number;
  sceneTitle: string;
  contentId: string;
  matchedText: string;
  type: "dialogue" | "stage-direction";
}

// Helper para verificar si es un diálogo
export function isDialogue(content: SceneContent): content is Dialogue {
  return "characterId" in content;
}

// Helper para verificar si es una acotación
export function isStageDirection(content: SceneContent): content is StageDirection {
  return "type" in content && content.type === "stage-direction";
}
