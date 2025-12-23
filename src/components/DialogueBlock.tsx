"use client";

import { Dialogue } from "@/types";
import { getCharacterColor } from "@/data/script";
import { highlightText } from "@/utils/search";

interface DialogueBlockProps {
  dialogue: Dialogue;
  searchQuery?: string;
  isHighlighted?: boolean;
  isDimmed?: boolean;
  fontSize?: "normal" | "large" | "xlarge";
}

export default function DialogueBlock({
  dialogue,
  searchQuery = "",
  isHighlighted = false,
  isDimmed = false,
  fontSize = "normal",
}: DialogueBlockProps) {
  const color = getCharacterColor(dialogue.characterId);
  
  // Clases de tamaño de fuente
  const fontSizeClasses = {
    normal: "text-base",
    large: "text-xl",
    xlarge: "text-3xl",
  };

  const headerSizeClasses = {
    normal: "text-sm",
    large: "text-lg",
    xlarge: "text-2xl",
  };

  // Función para renderizar texto con resaltado de búsqueda
  const renderText = (text: string) => {
    if (searchQuery) {
      return (
        <span 
          dangerouslySetInnerHTML={{ 
            __html: highlightText(text, searchQuery) 
          }} 
        />
      );
    }
    return text;
  };

  return (
    <div
      className={`
        relative pl-4 py-3 rounded-lg transition-all duration-300
        ${isHighlighted 
          ? "bg-christmas-gold-100 border-l-4 scale-[1.02] shadow-md" 
          : isDimmed 
            ? "opacity-40 bg-gray-50" 
            : "bg-christmas-cream-50 hover:bg-christmas-cream-100"
        }
      `}
      style={{
        borderLeftColor: isHighlighted ? color : "transparent",
        borderLeftWidth: isHighlighted ? "4px" : "0",
      }}
      role="article"
      aria-label={`Diálogo de ${dialogue.characterName}`}
    >
      {/* Header con personaje */}
      <div className={`flex flex-wrap items-center gap-2 mb-2 ${headerSizeClasses[fontSize]}`}>
        {/* Badge de personaje */}
        <span
          className="
            inline-flex items-center gap-1.5 
            px-2.5 py-1 
            rounded-full 
            font-semibold
          "
          style={{
            backgroundColor: `${color}20`,
            color: color,
          }}
        >
          <span 
            className="w-2 h-2 rounded-full" 
            style={{ backgroundColor: color }}
            aria-hidden="true"
          />
          {dialogue.characterName}
        </span>
        
        {/* Actor */}
        <span className="text-christmas-green-600">
          ({dialogue.actor})
        </span>
        
        {/* Indicación escénica si existe */}
        {dialogue.direction && (
          <span className="italic text-christmas-green-500">
            — {dialogue.direction}
          </span>
        )}
      </div>

      {/* Líneas del diálogo */}
      <div className={`space-y-1 text-christmas-green-800 ${fontSizeClasses[fontSize]}`}>
        {dialogue.lines.map((line, index) => (
          <p 
            key={index} 
            className="leading-relaxed font-serif"
          >
            &ldquo;{renderText(line)}&rdquo;
          </p>
        ))}
      </div>
    </div>
  );
}
