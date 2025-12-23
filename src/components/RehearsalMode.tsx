"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Theater, 
  ChevronLeft, 
  ChevronRight, 
  User,
  Maximize,
  X
} from "lucide-react";
import { Script, Character, Dialogue, isDialogue } from "@/types";
import { getCharacterColor } from "@/data/script";
import DialogueBlock from "./DialogueBlock";

interface RehearsalModeProps {
  script: Script;
  onEnterProjection?: () => void;
  onClose?: () => void;
}

// Interfaz para líneas de ensayo
interface RehearsalLine {
  sceneNumber: number;
  sceneTitle: string;
  dialogue: Dialogue;
  index: number;
}

export default function RehearsalMode({ script, onEnterProjection, onClose }: RehearsalModeProps) {
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  // Obtener todas las líneas del personaje seleccionado
  const characterLines = useMemo(() => {
    if (!selectedCharacterId) return [];

    const lines: RehearsalLine[] = [];
    let globalIndex = 0;

    script.scenes.forEach((scene) => {
      scene.content.forEach((content) => {
        if (isDialogue(content) && content.characterId === selectedCharacterId) {
          lines.push({
            sceneNumber: scene.number,
            sceneTitle: scene.title,
            dialogue: content,
            index: globalIndex,
          });
          globalIndex++;
        }
      });
    });

    // Agregar mensaje final si corresponde
    if (script.finalMessage.characterId === selectedCharacterId) {
      lines.push({
        sceneNumber: 0,
        sceneTitle: "Mensaje Final",
        dialogue: script.finalMessage,
        index: globalIndex,
      });
    }

    return lines;
  }, [script, selectedCharacterId]);

  // Obtener contexto (líneas anteriores y posteriores)
  const getContext = useMemo(() => {
    if (!selectedCharacterId || characterLines.length === 0) return { before: [], after: [] };

    const currentLine = characterLines[currentLineIndex];
    if (!currentLine) return { before: [], after: [] };

    const allDialogues: RehearsalLine[] = [];
    script.scenes.forEach((scene) => {
      scene.content.forEach((content) => {
        if (isDialogue(content)) {
          allDialogues.push({
            sceneNumber: scene.number,
            sceneTitle: scene.title,
            dialogue: content,
            index: allDialogues.length,
          });
        }
      });
    });

    // Encontrar la posición actual en todas las líneas
    const currentPosition = allDialogues.findIndex(
      (d) => d.dialogue.id === currentLine.dialogue.id
    );

    // Obtener 2 líneas antes y 2 después
    const before = allDialogues.slice(Math.max(0, currentPosition - 2), currentPosition);
    const after = allDialogues.slice(currentPosition + 1, currentPosition + 3);

    return { before, after };
  }, [script, selectedCharacterId, characterLines, currentLineIndex]);

  // Reset al cambiar de personaje
  useEffect(() => {
    setCurrentLineIndex(0);
  }, [selectedCharacterId]);

  // Navegación
  const goToNextLine = () => {
    if (currentLineIndex < characterLines.length - 1) {
      setCurrentLineIndex((prev) => prev + 1);
    }
  };

  const goToPreviousLine = () => {
    if (currentLineIndex > 0) {
      setCurrentLineIndex((prev) => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goToNextLine();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPreviousLine();
      } else if (e.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentLineIndex, characterLines.length]);

  const selectedCharacter = script.characters.find((c) => c.id === selectedCharacterId);
  const currentLine = characterLines[currentLineIndex];

  return (
    <section 
      className="min-h-screen bg-christmas-green-900 py-8"
      aria-labelledby="rehearsal-title"
    >
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Theater className="w-8 h-8 text-christmas-gold-400" aria-hidden="true" />
            <h2 
              id="rehearsal-title"
              className="font-serif text-2xl font-bold text-christmas-cream-100"
            >
              Modo Ensayo
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {onEnterProjection && (
              <button
                onClick={onEnterProjection}
                className="
                  flex items-center gap-2 px-4 py-2 
                  bg-christmas-gold-500 hover:bg-christmas-gold-400 
                  text-christmas-green-800 font-medium rounded-lg
                  transition-colors
                  focus:outline-none focus:ring-2 focus:ring-christmas-gold-300
                "
              >
                <Maximize className="w-4 h-4" />
                Proyección
              </button>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="
                  p-2 
                  text-christmas-cream-300 hover:text-christmas-cream-100 
                  hover:bg-christmas-green-800 
                  rounded-lg transition-colors
                  focus:outline-none focus:ring-2 focus:ring-christmas-gold-400
                "
                aria-label="Cerrar modo ensayo"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>

        {/* Selector de personaje */}
        <div className="mb-8">
          <label 
            htmlFor="character-select" 
            className="block text-christmas-cream-200 mb-3 font-medium"
          >
            Selecciona tu personaje:
          </label>
          <div className="relative">
            <select
              id="character-select"
              value={selectedCharacterId || ""}
              onChange={(e) => setSelectedCharacterId(e.target.value || null)}
              className="
                w-full px-4 py-3 pr-10
                bg-christmas-green-800 
                text-christmas-cream-100 
                border border-christmas-green-600
                rounded-lg
                appearance-none
                focus:outline-none focus:ring-2 focus:ring-christmas-gold-400 focus:border-christmas-gold-400
              "
            >
              <option value="">-- Elige un personaje --</option>
              {script.characters.map((char) => (
                <option key={char.id} value={char.id}>
                  {char.name} — {char.actor}
                </option>
              ))}
            </select>
            <User 
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-christmas-cream-400 pointer-events-none" 
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Contenido del ensayo */}
        {selectedCharacterId && characterLines.length > 0 ? (
          <div className="space-y-6">
            {/* Indicador de progreso */}
            <div className="flex items-center justify-between text-christmas-cream-300">
              <span>
                Línea {currentLineIndex + 1} de {characterLines.length}
              </span>
              <span className="text-sm">
                Escena {currentLine?.sceneNumber || "Final"}: {currentLine?.sceneTitle}
              </span>
            </div>

            {/* Barra de progreso */}
            <div 
              className="w-full h-2 bg-christmas-green-800 rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={currentLineIndex + 1}
              aria-valuemin={1}
              aria-valuemax={characterLines.length}
            >
              <motion.div
                className="h-full bg-christmas-gold-500"
                initial={{ width: 0 }}
                animate={{ 
                  width: `${((currentLineIndex + 1) / characterLines.length) * 100}%` 
                }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Contexto antes */}
            <AnimatePresence mode="wait">
              {getContext.before.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-2"
                >
                  <p className="text-xs text-christmas-cream-500 uppercase tracking-wider">
                    Contexto anterior
                  </p>
                  {getContext.before.map((line) => (
                    <div key={line.dialogue.id} className="opacity-50">
                      <DialogueBlock
                        dialogue={line.dialogue}
                        isDimmed={true}
                      />
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Línea actual */}
            <AnimatePresence mode="wait">
              {currentLine && (
                <motion.div
                  key={currentLine.dialogue.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="
                    p-6 
                    bg-christmas-cream-100 
                    rounded-2xl 
                    shadow-2xl
                    border-4
                  "
                  style={{ borderColor: getCharacterColor(currentLine.dialogue.characterId) }}
                >
                  <DialogueBlock
                    dialogue={currentLine.dialogue}
                    isHighlighted={true}
                    fontSize="large"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Contexto después */}
            <AnimatePresence mode="wait">
              {getContext.after.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="space-y-2"
                >
                  <p className="text-xs text-christmas-cream-500 uppercase tracking-wider">
                    Siguiente
                  </p>
                  {getContext.after.map((line) => (
                    <div key={line.dialogue.id} className="opacity-40">
                      <DialogueBlock
                        dialogue={line.dialogue}
                        isDimmed={true}
                      />
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Controles de navegación */}
            <div className="flex items-center justify-center gap-4 pt-6">
              <button
                onClick={goToPreviousLine}
                disabled={currentLineIndex === 0}
                className="
                  flex items-center gap-2 px-6 py-3
                  bg-christmas-green-700 hover:bg-christmas-green-600
                  disabled:bg-christmas-green-800 disabled:opacity-50 disabled:cursor-not-allowed
                  text-christmas-cream-100 
                  rounded-lg font-medium
                  transition-colors
                  focus:outline-none focus:ring-2 focus:ring-christmas-gold-400
                "
                aria-label="Línea anterior"
              >
                <ChevronLeft className="w-5 h-5" />
                Anterior
              </button>

              <button
                onClick={goToNextLine}
                disabled={currentLineIndex === characterLines.length - 1}
                className="
                  flex items-center gap-2 px-6 py-3
                  bg-christmas-gold-500 hover:bg-christmas-gold-400
                  disabled:bg-christmas-green-800 disabled:opacity-50 disabled:cursor-not-allowed
                  text-christmas-green-800 
                  rounded-lg font-bold
                  transition-colors
                  focus:outline-none focus:ring-2 focus:ring-christmas-gold-300
                "
                aria-label="Siguiente línea"
              >
                Siguiente
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Ayuda de teclado */}
            <p className="text-center text-christmas-cream-500 text-sm">
              Usa las teclas <kbd className="px-2 py-1 bg-christmas-green-800 rounded">←</kbd> y <kbd className="px-2 py-1 bg-christmas-green-800 rounded">→</kbd> o <kbd className="px-2 py-1 bg-christmas-green-800 rounded">Espacio</kbd> para navegar
            </p>
          </div>
        ) : selectedCharacterId ? (
          <div className="text-center py-12">
            <p className="text-christmas-cream-300 text-lg">
              Este personaje no tiene líneas de diálogo.
            </p>
          </div>
        ) : (
          <div className="text-center py-12 bg-christmas-green-800/50 rounded-xl">
            <User className="w-16 h-16 text-christmas-cream-500 mx-auto mb-4" aria-hidden="true" />
            <p className="text-christmas-cream-300 text-lg">
              Selecciona un personaje para comenzar a ensayar
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
