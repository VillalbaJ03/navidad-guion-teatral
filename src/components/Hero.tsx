"use client";

import { motion } from "framer-motion";
import { Star, ChevronDown } from "lucide-react";

interface HeroProps {
  title: string;
  subtitle?: string;
  centralPhrase: string;
  onViewScript: () => void;
}

export default function Hero({ title, subtitle, centralPhrase, onViewScript }: HeroProps) {
  const scrollToContent = () => {
    onViewScript();
    // Scroll suave a la sección de contenido
    setTimeout(() => {
      const element = document.getElementById("script-content");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <section 
      className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-christmas-green-700 via-christmas-green-800 to-christmas-green-900 overflow-hidden print:min-h-0 print:py-8 print:bg-white"
      role="region"
      aria-label="Portada del guion"
    >
      {/* Estrellas decorativas de fondo */}
      <div className="absolute inset-0 overflow-hidden print:hidden" aria-hidden="true">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-christmas-gold-400/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Star className="w-4 h-4" />
          </motion.div>
        ))}
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Estrella decorativa superior */}
          <motion.div
            className="flex justify-center mb-6 print:hidden"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
          >
            <Star className="w-12 h-12 text-christmas-gold-400 fill-christmas-gold-400" />
          </motion.div>

          {/* Subtítulo */}
          {subtitle && (
            <motion.p
              className="text-christmas-gold-400 font-sans text-sm uppercase tracking-widest mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {subtitle}
            </motion.p>
          )}

          {/* Título principal */}
          <motion.h1
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-christmas-cream-50 mb-6 leading-tight print:text-christmas-green-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {title}
          </motion.h1>

          {/* Línea decorativa */}
          <motion.div 
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4 }}
            aria-hidden="true"
          >
            <div className="h-px w-16 bg-christmas-gold-500" />
            <Star className="w-4 h-4 text-christmas-gold-500" />
            <div className="h-px w-16 bg-christmas-gold-500" />
          </motion.div>

          {/* Frase central */}
          <motion.blockquote
            className="font-serif text-xl sm:text-2xl text-christmas-cream-100 italic mb-10 max-w-2xl mx-auto print:text-christmas-green-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            &ldquo;{centralPhrase}&rdquo;
          </motion.blockquote>

          {/* Botón CTA */}
          <motion.button
            onClick={scrollToContent}
            className="
              inline-flex items-center gap-2 
              bg-christmas-gold-500 hover:bg-christmas-gold-400 
              text-christmas-green-800 font-bold 
              px-8 py-4 rounded-full 
              shadow-lg hover:shadow-xl 
              transition-all duration-300
              focus:outline-none focus:ring-4 focus:ring-christmas-gold-300 focus:ring-offset-2 focus:ring-offset-christmas-green-800
              print:hidden
            "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver Guion
            <ChevronDown className="w-5 h-5" aria-hidden="true" />
          </motion.button>
        </motion.div>
      </div>

      {/* Gradiente inferior */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-christmas-cream-100 to-transparent print:hidden"
        aria-hidden="true"
      />
    </section>
  );
}
