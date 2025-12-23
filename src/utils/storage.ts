import { Script, Scene, SearchResult, isDialogue, isStageDirection } from "@/types";

/**
 * Clave para almacenar estado en localStorage
 */
const STORAGE_KEY = "navidad-guion-state";

/**
 * Estado persistente de la aplicación
 */
interface AppState {
  selectedCharacterId: string | null;
  currentLineIndex: number;
  expandedScenes: string[];
}

/**
 * Guarda el estado en localStorage
 */
export function saveState(state: Partial<AppState>): void {
  if (typeof window === "undefined") return;
  
  const currentState = loadState();
  const newState = { ...currentState, ...state };
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
  }
}

/**
 * Carga el estado desde localStorage
 */
export function loadState(): AppState {
  if (typeof window === "undefined") {
    return getDefaultState();
  }
  
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("Error loading state from localStorage:", error);
  }
  
  return getDefaultState();
}

/**
 * Estado por defecto
 */
function getDefaultState(): AppState {
  return {
    selectedCharacterId: null,
    currentLineIndex: 0,
    expandedScenes: [],
  };
}

/**
 * Limpia el estado guardado
 */
export function clearState(): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing state from localStorage:", error);
  }
}
