"use client";

import { motion } from "framer-motion";
import { MessageSquareQuote } from "lucide-react";
import { Dialogue } from "@/types";
import DialogueBlock from "./DialogueBlock";

interface FinalMessageProps {
  message: Dialogue;
  searchQuery?: string;
}

export default function FinalMessage({ message, searchQuery = "" }: FinalMessageProps) {
  return (
    <section 
      className="py-12 bg-gradient-to-b from-christmas-cream-50 to-christmas-cream-100"
      aria-labelledby="final-message-title"
    >
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Título */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <MessageSquareQuote className="w-6 h-6 text-christmas-green-700" aria-hidden="true" />
              <h2 
                id="final-message-title"
                className="font-serif text-2xl font-bold text-christmas-green-800"
              >
                Mensaje Final
              </h2>
            </div>
          </div>

          {/* Bloque del mensaje */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-christmas-gold-200">
            <DialogueBlock
              dialogue={message}
              searchQuery={searchQuery}
              isHighlighted={true}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
