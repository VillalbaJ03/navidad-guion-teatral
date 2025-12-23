"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, BookOpen, Quote } from "lucide-react";
import { Scene, isDialogue, isStageDirection } from "@/types";
import { getCharacterColor } from "@/data/script";
import DialogueBlock from "./DialogueBlock";
import StageDirectionBlock from "./StageDirectionBlock";

interface SceneAccordionProps {
  scenes: Scene[];
  searchQuery?: string;
  expandedScenes?: string[];
  onToggleScene?: (sceneId: string) => void;
  highlightCharacter?: string | null;
}

export default function SceneAccordion({
  scenes,
  searchQuery = "",
  expandedScenes = [],
  onToggleScene,
  highlightCharacter,
}: SceneAccordionProps) {
  // Estado interno si no se provee control externo
  const [internalExpanded, setInternalExpanded] = useState<string[]>([]);
  
  const expanded = onToggleScene ? expandedScenes : internalExpanded;
  
  const handleToggle = (sceneId: string) => {
    if (onToggleScene) {
      onToggleScene(sceneId);
    } else {
      setInternalExpanded((prev) =>
        prev.includes(sceneId)
          ? prev.filter((id) => id !== sceneId)
          : [...prev, sceneId]
      );
    }
  };

  const isExpanded = (sceneId: string) => expanded.includes(sceneId);

  return (
    <section 
      className="py-8 bg-christmas-cream-50"
      aria-labelledby="scenes-title"
    >
      <div className="max-w-4xl mx-auto px-4">
        {/* Título de sección */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <BookOpen className="w-6 h-6 text-christmas-green-700" aria-hidden="true" />
            <h2 
              id="scenes-title"
              className="font-serif text-3xl font-bold text-christmas-green-800"
            >
              Escenas
            </h2>
          </div>
          <p className="text-christmas-green-600">
            El guion completo de la obra
          </p>
        </div>

        {/* Lista de escenas */}
        <div className="space-y-4" role="list" aria-label="Escenas del guion">
          {scenes.map((scene, index) => (
            <motion.article
              key={scene.id}
              className="bg-white rounded-xl shadow-sm border border-christmas-cream-200 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              role="listitem"
            >
              {/* Header del acordeón */}
              <button
                onClick={() => handleToggle(scene.id)}
                className="
                  w-full flex items-center justify-between 
                  px-5 py-4 
                  text-left 
                  hover:bg-christmas-cream-50 
                  transition-colors
                  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-christmas-gold-400
                "
                aria-expanded={isExpanded(scene.id)}
                aria-controls={`scene-content-${scene.id}`}
              >
                <div className="flex items-center gap-3">
                  {/* Número de escena */}
                  <span 
                    className="
                      flex-shrink-0 w-8 h-8 
                      bg-christmas-green-700 text-christmas-cream-100 
                      rounded-full flex items-center justify-center 
                      text-sm font-bold
                    "
                    aria-hidden="true"
                  >
                    {scene.number}
                  </span>
                  
                  {/* Título */}
                  <h3 className="font-serif text-lg font-semibold text-christmas-green-800">
                    <span className="sr-only">Escena {scene.number}: </span>
                    {scene.title}
                  </h3>
                </div>

                {/* Icono expandir */}
                <motion.div
                  animate={{ rotate: isExpanded(scene.id) ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  aria-hidden="true"
                >
                  <ChevronDown className="w-5 h-5 text-christmas-green-600" />
                </motion.div>
              </button>

              {/* Contenido de la escena */}
              <AnimatePresence initial={false}>
                {isExpanded(scene.id) && (
                  <motion.div
                    id={`scene-content-${scene.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-2 border-t border-christmas-cream-100">
                      <div className="space-y-4">
                        {scene.content.map((content) => {
                          if (isStageDirection(content)) {
                            return (
                              <StageDirectionBlock
                                key={content.id}
                                direction={content}
                                searchQuery={searchQuery}
                              />
                            );
                          } else if (isDialogue(content)) {
                            return (
                              <DialogueBlock
                                key={content.id}
                                dialogue={content}
                                searchQuery={searchQuery}
                                isHighlighted={highlightCharacter === content.characterId}
                                isDimmed={!!highlightCharacter && highlightCharacter !== content.characterId}
                              />
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
