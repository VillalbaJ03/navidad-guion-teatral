"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Music, Pause, Play } from "lucide-react";

interface MusicPlayerProps {
  songTitle?: string;
  artist?: string;
}

export default function MusicPlayer({ 
  songTitle = "Un Corazón", 
  artist = "Canela y Mantequilla" 
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3); // Volumen bajo para fondo
  const [showControls, setShowControls] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Intentar reproducir cuando el usuario interactúa con la página
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        // No auto-play, esperar a que el usuario haga clic en play
      }
    };

    document.addEventListener("click", handleFirstInteraction, { once: true });
    document.addEventListener("keydown", handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
    };
  }, [hasInteracted]);

  // Actualizar volumen del audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log("Error al reproducir audio:", error);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  return (
    <>
      {/* Elemento de audio oculto */}
      <audio
        ref={audioRef}
        src="/music/un-corazon.mp3"
        loop
        preload="auto"
        onEnded={() => setIsPlaying(false)}
        onError={() => console.log("Error cargando el audio. Asegúrate de que el archivo existe en /public/music/un-corazon.mp3")}
      />

      {/* Botón flotante del reproductor */}
      <div 
        className="fixed bottom-6 right-6 z-40 print:hidden"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="
                absolute bottom-16 right-0
                bg-christmas-green-800/95 backdrop-blur-sm
                rounded-xl p-4 shadow-xl
                border border-christmas-gold-500/30
                min-w-[200px]
              "
            >
              {/* Info de la canción */}
              <div className="mb-3 text-center">
                <p className="text-christmas-cream-100 font-medium text-sm">
                  {songTitle}
                </p>
                <p className="text-christmas-cream-400 text-xs">
                  {artist}
                </p>
              </div>

              {/* Control de volumen */}
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleMute}
                  className="
                    p-1.5 rounded-lg
                    text-christmas-cream-300 hover:text-christmas-cream-100
                    hover:bg-christmas-green-700
                    transition-colors
                  "
                  aria-label={isMuted ? "Activar sonido" : "Silenciar"}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="
                    flex-1 h-1.5 
                    bg-christmas-green-600 rounded-full
                    appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-3
                    [&::-webkit-slider-thumb]:h-3
                    [&::-webkit-slider-thumb]:bg-christmas-gold-400
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:cursor-pointer
                  "
                  aria-label="Control de volumen"
                />
              </div>

              {/* Indicador visual */}
              {isPlaying && (
                <div className="flex items-center justify-center gap-1 mt-3">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-christmas-gold-400 rounded-full"
                      animate={{
                        height: [4, 12, 4],
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botón principal */}
        <motion.button
          onClick={togglePlay}
          className={`
            relative
            w-14 h-14 rounded-full
            flex items-center justify-center
            shadow-lg
            transition-all duration-300
            focus:outline-none focus:ring-4 focus:ring-christmas-gold-300/50
            ${isPlaying 
              ? "bg-christmas-gold-500 hover:bg-christmas-gold-400 text-christmas-green-800" 
              : "bg-christmas-green-700 hover:bg-christmas-green-600 text-christmas-cream-100"
            }
          `}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-1" />
          )}

          {/* Indicador de reproducción */}
          {isPlaying && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-christmas-gold-300"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.button>

        {/* Nota musical decorativa */}
        <motion.div
          className="absolute -top-2 -left-2 text-christmas-gold-400"
          animate={isPlaying ? { 
            y: [-5, 5, -5],
            rotate: [-10, 10, -10],
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Music className="w-5 h-5" />
        </motion.div>
      </div>
    </>
  );
}
