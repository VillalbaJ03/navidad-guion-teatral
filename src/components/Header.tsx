"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Star, Book } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  onModeChange?: (mode: "script" | "rehearsal" | "projection") => void;
  currentMode?: "script" | "rehearsal" | "projection";
}

export default function Header({ onModeChange, currentMode = "script" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const modes = [
    { id: "script" as const, label: "Ver Guion", icon: Book },
    { id: "rehearsal" as const, label: "Modo Ensayo", icon: Star },
  ];

  return (
    <header 
      className="sticky top-0 z-50 bg-christmas-green-700/95 backdrop-blur-sm border-b border-christmas-gold-500/30 print:static print:bg-white print:border-christmas-green-700"
      role="banner"
    >
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/"
            className="flex items-center gap-2 text-christmas-cream-100 hover:text-christmas-gold-400 transition-colors focus:outline-none focus:ring-2 focus:ring-christmas-gold-400 focus:ring-offset-2 focus:ring-offset-christmas-green-700 rounded-lg px-2 py-1"
            aria-label="Ir al inicio"
          >
            <Star className="w-6 h-6 text-christmas-gold-400" aria-hidden="true" />
            <span className="font-serif font-bold text-lg hidden sm:inline">
              La Navidad
            </span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-2" aria-label="Modos de visualización">
            {modes.map((mode) => {
              const Icon = mode.icon;
              const isActive = currentMode === mode.id;
              
              return (
                <button
                  key={mode.id}
                  onClick={() => onModeChange?.(mode.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
                    focus:outline-none focus:ring-2 focus:ring-christmas-gold-400 focus:ring-offset-2 focus:ring-offset-christmas-green-700
                    ${isActive 
                      ? "bg-christmas-gold-500 text-christmas-green-800" 
                      : "text-christmas-cream-100 hover:bg-christmas-green-600"
                    }
                  `}
                  aria-pressed={isActive}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  {mode.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-christmas-cream-100 hover:bg-christmas-green-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-christmas-gold-400"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
              aria-label="Menú móvil"
            >
              <div className="pt-4 pb-2 space-y-2">
                {modes.map((mode) => {
                  const Icon = mode.icon;
                  const isActive = currentMode === mode.id;
                  
                  return (
                    <button
                      key={mode.id}
                      onClick={() => {
                        onModeChange?.(mode.id);
                        setIsMenuOpen(false);
                      }}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all
                        ${isActive 
                          ? "bg-christmas-gold-500 text-christmas-green-800" 
                          : "text-christmas-cream-100 hover:bg-christmas-green-600"
                        }
                      `}
                      aria-pressed={isActive}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                      {mode.label}
                    </button>
                  );
                })}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
