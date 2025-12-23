"use client";

import { motion } from "framer-motion";
import { User, Users } from "lucide-react";
import { Character } from "@/types";

interface CastListProps {
  characters: Character[];
}

export default function CastList({ characters }: CastListProps) {
  return (
    <section 
      className="py-12 bg-christmas-cream-100"
      aria-labelledby="cast-title"
    >
      <div className="max-w-4xl mx-auto px-4">
        {/* Título de sección */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <Users className="w-6 h-6 text-christmas-green-700" aria-hidden="true" />
            <h2 
              id="cast-title"
              className="font-serif text-3xl font-bold text-christmas-green-800"
            >
              Personajes
            </h2>
          </div>
          <p className="text-christmas-green-600">
            El elenco de nuestra obra navideña
          </p>
        </motion.div>

        {/* Lista de personajes */}
        <div 
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="Lista de personajes y actores"
        >
          {characters.map((character, index) => (
            <motion.div
              key={character.id}
              className="
                flex items-center gap-3 
                bg-white rounded-lg p-4 
                shadow-sm hover:shadow-md 
                border border-christmas-cream-200
                transition-shadow duration-200
              "
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              role="listitem"
            >
              {/* Avatar con color del personaje */}
              <div 
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${character.color}20` }}
                aria-hidden="true"
              >
                <User 
                  className="w-5 h-5" 
                  style={{ color: character.color }}
                />
              </div>
              
              {/* Información */}
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-christmas-green-800 truncate">
                  {character.name}
                </h3>
                <p className="text-sm text-christmas-green-600 truncate">
                  <span className="sr-only">Interpretado por: </span>
                  {character.actor}
                </p>
              </div>

              {/* Badge de color */}
              <div
                className="flex-shrink-0 w-3 h-3 rounded-full"
                style={{ backgroundColor: character.color }}
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
