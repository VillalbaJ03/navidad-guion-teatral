"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { script } from "@/data/script";
import {
  Header,
  Footer,
  Hero,
  CastList,
  SceneAccordion,
  FinalMessage,
  RehearsalMode,
  ProjectionMode,
  ExportBar,
  Search,
  MusicPlayer,
} from "@/components";
import { saveState, loadState } from "@/utils/storage";

// Tipos para los modos de visualización
type ViewMode = "script" | "rehearsal" | "projection";

export default function Home() {
  // Estado del modo actual
  const [viewMode, setViewMode] = useState<ViewMode>("script");
  
  // Estado de escenas expandidas
  const [expandedScenes, setExpandedScenes] = useState<string[]>([]);
  
  // Estado de búsqueda
  const [searchQuery, setSearchQuery] = useState("");
  
  // Estado para personaje seleccionado (para proyección desde ensayo)
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  
  // Ref para scroll
  const scriptContentRef = useRef<HTMLDivElement>(null);

  // Cargar estado persistente
  useEffect(() => {
    const savedState = loadState();
    if (savedState.expandedScenes?.length > 0) {
      setExpandedScenes(savedState.expandedScenes);
    }
  }, []);

  // Guardar estado cuando cambian las escenas expandidas
  useEffect(() => {
    saveState({ expandedScenes });
  }, [expandedScenes]);

  // Expandir todos los acordeones antes de imprimir
  useEffect(() => {
    const handleBeforePrint = () => {
      // Expandir todas las escenas para impresión
      const allSceneIds = script.scenes.map((scene) => scene.id);
      setExpandedScenes(allSceneIds);
    };

    window.addEventListener("beforeprint", handleBeforePrint);
    return () => window.removeEventListener("beforeprint", handleBeforePrint);
  }, []);

  // Cambiar modo de visualización
  const handleModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    
    // Si entramos en modo ensayo o proyección, scroll al inicio
    if (mode !== "script") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Toggle de escena
  const handleToggleScene = useCallback((sceneId: string) => {
    setExpandedScenes((prev) =>
      prev.includes(sceneId)
        ? prev.filter((id) => id !== sceneId)
        : [...prev, sceneId]
    );
  }, []);

  // Manejar clic en resultado de búsqueda
  const handleSearchResultClick = useCallback((sceneId: string, contentId: string) => {
    // Expandir la escena
    setExpandedScenes((prev) => 
      prev.includes(sceneId) ? prev : [...prev, sceneId]
    );
    
    // Esperar a que se expanda y hacer scroll
    setTimeout(() => {
      const element = document.getElementById(`scene-content-${sceneId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 300);
  }, []);

  // Manejar cambio de búsqueda
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    
    // Si hay búsqueda, expandir todas las escenas que coincidan
    if (query.trim()) {
      const matchingScenes = script.scenes
        .filter((scene) => 
          scene.content.some((content) => {
            if ("text" in content) {
              return content.text.toLowerCase().includes(query.toLowerCase());
            } else if ("lines" in content) {
              return content.lines.some((line) => 
                line.toLowerCase().includes(query.toLowerCase())
              ) || 
                content.characterName.toLowerCase().includes(query.toLowerCase()) ||
                content.actor.toLowerCase().includes(query.toLowerCase());
            }
            return false;
          })
        )
        .map((scene) => scene.id);
      
      if (matchingScenes.length > 0) {
        setExpandedScenes(matchingScenes);
      }
    }
  }, []);

  // Entrar en modo proyección desde ensayo
  const handleEnterProjection = useCallback(() => {
    setViewMode("projection");
  }, []);

  // Cerrar modo ensayo/proyección
  const handleCloseMode = useCallback(() => {
    setViewMode("script");
  }, []);

  // Scroll a contenido del guion
  const scrollToScript = useCallback(() => {
    // Expandir la primera escena
    if (expandedScenes.length === 0) {
      setExpandedScenes([script.scenes[0]?.id || ""]);
    }
    
    // Scroll
    if (scriptContentRef.current) {
      scriptContentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [expandedScenes.length]);

  return (
    <>
      {/* Reproductor de música de fondo */}
      <MusicPlayer 
        songTitle="Un Corazón" 
        artist="Canela y Mantequilla" 
      />

      {/* Modo Proyección (pantalla completa) */}
      <AnimatePresence>
        {viewMode === "projection" && (
          <ProjectionMode
            script={script}
            selectedCharacterId={selectedCharacterId}
            onClose={handleCloseMode}
          />
        )}
      </AnimatePresence>

      {/* Layout normal */}
      {viewMode !== "projection" && (
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <Header
            currentMode={viewMode}
            onModeChange={handleModeChange}
          />

          {/* Main content */}
          <main id="main-content" className="flex-1">
            {viewMode === "script" ? (
              <>
                {/* Hero / Portada */}
                <Hero
                  title={script.title}
                  subtitle={script.subtitle}
                  centralPhrase={script.centralPhrase}
                  onViewScript={scrollToScript}
                />

                {/* Buscador */}
                <div className="py-6 bg-christmas-cream-100" id="script-content" ref={scriptContentRef}>
                  <div className="max-w-4xl mx-auto px-4">
                    <Search
                      script={script}
                      onResultClick={handleSearchResultClick}
                      onSearchChange={handleSearchChange}
                    />
                  </div>
                </div>

                {/* Lista de personajes */}
                <CastList characters={script.characters} />

                {/* Escenas */}
                <SceneAccordion
                  scenes={script.scenes}
                  searchQuery={searchQuery}
                  expandedScenes={expandedScenes}
                  onToggleScene={handleToggleScene}
                />

                {/* Mensaje Final */}
                <FinalMessage
                  message={script.finalMessage}
                  searchQuery={searchQuery}
                />

                {/* Barra de exportación */}
                <ExportBar script={script} />
              </>
            ) : viewMode === "rehearsal" ? (
              <RehearsalMode
                script={script}
                onEnterProjection={handleEnterProjection}
                onClose={handleCloseMode}
              />
            ) : null}
          </main>

          {/* Footer */}
          {viewMode === "script" && <Footer />}
        </div>
      )}
    </>
  );
}
