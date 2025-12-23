"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, X, ArrowRight } from "lucide-react";
import { Script, SearchResult } from "@/types";
import { searchScript } from "@/utils/search";

interface SearchProps {
  script: Script;
  onResultClick?: (sceneId: string, contentId: string) => void;
  onSearchChange?: (query: string) => void;
}

export default function Search({ script, onResultClick, onSearchChange }: SearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Buscar cuando cambia el query
  useEffect(() => {
    const searchResults = searchScript(script, query);
    setResults(searchResults);
    onSearchChange?.(query);
    setIsOpen(query.length > 0);
  }, [query, script, onSearchChange]);

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K para abrir búsqueda
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      // Escape para cerrar
      if (e.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleResultClick = (result: SearchResult) => {
    onResultClick?.(result.sceneId, result.contentId);
    setIsOpen(false);
  };

  // Highlight matched text
  const highlightMatch = (text: string) => {
    if (!query.trim()) return text;
    
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-christmas-gold-300 px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-xl mx-auto print:hidden"
    >
      {/* Input de búsqueda */}
      <div className="relative">
        <SearchIcon 
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-christmas-green-500" 
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 0 && setIsOpen(true)}
          placeholder="Buscar en el guion... (Ctrl+K)"
          className="
            w-full pl-12 pr-12 py-3
            bg-white 
            border border-christmas-cream-300
            rounded-xl
            text-christmas-green-800
            placeholder:text-christmas-green-400
            focus:outline-none focus:ring-2 focus:ring-christmas-gold-400 focus:border-christmas-gold-400
            transition-all
          "
          aria-label="Buscar en el guion"
          aria-expanded={isOpen}
          aria-controls="search-results"
        />
        
        {query && (
          <button
            onClick={handleClear}
            className="
              absolute right-4 top-1/2 -translate-y-1/2 
              p-1 
              text-christmas-green-400 hover:text-christmas-green-600
              rounded-full hover:bg-christmas-cream-100
              transition-colors
            "
            aria-label="Limpiar búsqueda"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Resultados */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="search-results"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="
              absolute z-50 w-full mt-2
              bg-white 
              border border-christmas-cream-200
              rounded-xl
              shadow-lg
              max-h-80 overflow-y-auto
            "
            role="listbox"
          >
            {results.length > 0 ? (
              <ul className="divide-y divide-christmas-cream-100">
                {results.slice(0, 10).map((result, index) => (
                  <li key={`${result.sceneId}-${result.contentId}-${index}`}>
                    <button
                      onClick={() => handleResultClick(result)}
                      className="
                        w-full flex items-start gap-3 p-3
                        text-left
                        hover:bg-christmas-cream-50
                        focus:outline-none focus:bg-christmas-cream-100
                        transition-colors
                      "
                      role="option"
                    >
                      {/* Badge de escena */}
                      <span 
                        className="
                          flex-shrink-0 
                          px-2 py-1 
                          bg-christmas-green-100 text-christmas-green-700
                          rounded text-xs font-medium
                        "
                      >
                        {result.sceneNumber > 0 
                          ? `E${result.sceneNumber}` 
                          : "Final"
                        }
                      </span>
                      
                      {/* Contenido */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-christmas-green-800 truncate">
                          {result.sceneTitle}
                        </p>
                        <p className="text-sm text-christmas-green-600 line-clamp-2">
                          {highlightMatch(result.matchedText)}
                        </p>
                      </div>

                      {/* Flecha */}
                      <ArrowRight 
                        className="flex-shrink-0 w-4 h-4 text-christmas-green-400" 
                        aria-hidden="true"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            ) : query.length > 0 ? (
              <div className="p-4 text-center">
                <p className="text-christmas-green-500">
                  No se encontraron resultados para &ldquo;{query}&rdquo;
                </p>
              </div>
            ) : null}

            {/* Contador de resultados */}
            {results.length > 10 && (
              <div className="p-2 text-center text-sm text-christmas-green-500 border-t border-christmas-cream-100">
                Mostrando 10 de {results.length} resultados
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
