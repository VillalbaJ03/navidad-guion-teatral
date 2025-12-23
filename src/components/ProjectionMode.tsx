"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2,
  Minimize2,
  User
} from "lucide-react";
import { Script, Dialogue, isDialogue, SceneContent } from "@/types";
import { getCharacterColor } from "@/data/script";

interface ProjectionModeProps {
  script: Script;
  selectedCharacterId?: string | null;
  onClose: () => void;
}

// Interfaz para elementos proyectables
interface ProjectableItem {
  type: "dialogue" | "stage-direction";
  sceneNumber: number;
  sceneTitle: string;
  content: SceneContent;
}

export default function ProjectionMode({ 
  script, 
  selectedCharacterId,
  onClose 
}: ProjectionModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Obtener todos los elementos proyectables
  const allItems = useMemo(() => {
    const items: ProjectableItem[] = [];

    script.scenes.forEach((scene) => {
      scene.content.forEach((content) => {
        items.push({
          type: isDialogue(content) ? "dialogue" : "stage-direction",
          sceneNumber: scene.number,
          sceneTitle: scene.title,
          content,
        });
      });
    });

    // Agregar mensaje final
    items.push({
      type: "dialogue",
      sceneNumber: 0,
      sceneTitle: "Mensaje Final",
      content: script.finalMessage,
    });

    return items;
  }, [script]);

  // Filtrar por personaje si está seleccionado
  const filteredItems = useMemo(() => {
    if (!selectedCharacterId) return allItems;
    
    return allItems.filter((item) => {
      if (item.type === "dialogue") {
        const dialogue = item.content as Dialogue;
        return dialogue.characterId === selectedCharacterId;
      }
      return false;
    });
  }, [allItems, selectedCharacterId]);

  const currentItem = filteredItems[currentIndex];

  // Navegación
  const goToNext = () => {
    if (currentIndex < filteredItems.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        goToNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, filteredItems.length]);

  // Fullscreen
  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      try {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.error("Error entering fullscreen:", err);
      }
    } else {
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch (err) {
        console.error("Error exiting fullscreen:", err);
      }
    }
  };

  // Listener para cambios de fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Reset al cerrar
  useEffect(() => {
    return () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    };
  }, []);

  const renderContent = () => {
    if (!currentItem) return null;

    if (currentItem.type === "stage-direction") {
      const direction = currentItem.content as { text: string };
      return (
        <motion.div
          key={`dir-${currentIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-center"
        >
          <p className="text-2xl md:text-4xl lg:text-5xl italic text-christmas-gold-300 leading-relaxed">
            [{direction.text}]
          </p>
        </motion.div>
      );
    }

    const dialogue = currentItem.content as Dialogue;
    const color = getCharacterColor(dialogue.characterId);

    return (
      <motion.div
        key={`dial-${currentIndex}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="text-center max-w-5xl mx-auto"
      >
        {/* Personaje */}
        <div className="mb-8">
          <span
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-2xl md:text-3xl font-bold"
            style={{
              backgroundColor: `${color}30`,
              color: color,
            }}
          >
            <span 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: color }}
              aria-hidden="true"
            />
            {dialogue.characterName}
            <span className="font-normal text-xl md:text-2xl opacity-70">
              ({dialogue.actor})
            </span>
          </span>
          
          {dialogue.direction && (
            <p className="mt-3 text-xl md:text-2xl text-christmas-cream-400 italic">
              — {dialogue.direction} —
            </p>
          )}
        </div>

        {/* Líneas */}
        <div className="space-y-4">
          {dialogue.lines.map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-serif text-christmas-cream-50 leading-relaxed"
            >
              &ldquo;{line}&rdquo;
            </motion.p>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-christmas-green-900 flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Modo proyección"
    >
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between p-4 bg-christmas-green-950/50">
        <div className="flex items-center gap-4">
          <span className="text-christmas-cream-300 font-medium">
            {currentItem?.sceneNumber 
              ? `Escena ${currentItem.sceneNumber}: ${currentItem.sceneTitle}`
              : currentItem?.sceneTitle
            }
          </span>
          <span className="text-christmas-cream-500">
            {currentIndex + 1} / {filteredItems.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            className="
              p-2 
              text-christmas-cream-300 hover:text-christmas-cream-100 
              hover:bg-christmas-green-800 
              rounded-lg transition-colors
              focus:outline-none focus:ring-2 focus:ring-christmas-gold-400
            "
            aria-label={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
          >
            {isFullscreen ? (
              <Minimize2 className="w-6 h-6" />
            ) : (
              <Maximize2 className="w-6 h-6" />
            )}
          </button>
          
          <button
            onClick={onClose}
            className="
              p-2 
              text-christmas-cream-300 hover:text-christmas-cream-100 
              hover:bg-christmas-green-800 
              rounded-lg transition-colors
              focus:outline-none focus:ring-2 focus:ring-christmas-gold-400
            "
            aria-label="Cerrar proyección"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-hidden">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </div>

      {/* Controles de navegación */}
      <div className="flex-shrink-0 flex items-center justify-between p-6 bg-christmas-green-950/50">
        <button
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className="
            flex items-center gap-2 px-8 py-4
            bg-christmas-green-700 hover:bg-christmas-green-600
            disabled:bg-christmas-green-800 disabled:opacity-50 disabled:cursor-not-allowed
            text-christmas-cream-100 
            rounded-xl font-medium text-xl
            transition-colors
            focus:outline-none focus:ring-2 focus:ring-christmas-gold-400
          "
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6" />
          Anterior
        </button>

        {/* Barra de progreso */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div 
            className="w-full h-2 bg-christmas-green-800 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={currentIndex + 1}
            aria-valuemin={1}
            aria-valuemax={filteredItems.length}
          >
            <motion.div
              className="h-full bg-christmas-gold-500"
              animate={{ 
                width: `${((currentIndex + 1) / filteredItems.length) * 100}%` 
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <button
          onClick={goToNext}
          disabled={currentIndex === filteredItems.length - 1}
          className="
            flex items-center gap-2 px-8 py-4
            bg-christmas-gold-500 hover:bg-christmas-gold-400
            disabled:bg-christmas-green-800 disabled:opacity-50 disabled:cursor-not-allowed
            text-christmas-green-800 
            rounded-xl font-bold text-xl
            transition-colors
            focus:outline-none focus:ring-2 focus:ring-christmas-gold-300
          "
          aria-label="Siguiente"
        >
          Siguiente
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Ayuda de teclado */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 hidden md:block">
        <p className="text-christmas-cream-500 text-sm">
          <kbd className="px-2 py-1 bg-christmas-green-800 rounded">←</kbd> Anterior · 
          <kbd className="px-2 py-1 bg-christmas-green-800 rounded mx-1">→</kbd> o 
          <kbd className="px-2 py-1 bg-christmas-green-800 rounded mx-1">Espacio</kbd> Siguiente · 
          <kbd className="px-2 py-1 bg-christmas-green-800 rounded mx-1">F</kbd> Pantalla completa · 
          <kbd className="px-2 py-1 bg-christmas-green-800 rounded">Esc</kbd> Cerrar
        </p>
      </div>
    </div>
  );
}
