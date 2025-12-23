"use client";

import { useState } from "react";
import { 
  Copy, 
  Download, 
  Printer, 
  Check,
  FileText
} from "lucide-react";
import { Script } from "@/types";
import { generateScriptText, copyToClipboard, downloadAsText, printScript } from "@/utils/export";

interface ExportBarProps {
  script: Script;
}

export default function ExportBar({ script }: ExportBarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = generateScriptText(script);
    const success = await copyToClipboard(text);
    
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    downloadAsText(script);
  };

  const handlePrint = () => {
    printScript();
  };

  return (
    <section 
      className="py-8 bg-christmas-green-50 print:hidden"
      aria-labelledby="export-title"
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <FileText className="w-6 h-6 text-christmas-green-700" aria-hidden="true" />
            <h2 
              id="export-title"
              className="font-serif text-2xl font-bold text-christmas-green-800"
            >
              Exportar Guion
            </h2>
          </div>
          <p className="text-christmas-green-600">
            Descarga o comparte el guion completo
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Copiar al portapapeles */}
          <button
            onClick={handleCopy}
            className="
              flex items-center gap-2 px-5 py-3
              bg-white hover:bg-christmas-cream-100
              border border-christmas-green-200
              text-christmas-green-700
              rounded-lg font-medium
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-christmas-gold-400 focus:ring-offset-2
              shadow-sm hover:shadow
            "
            aria-label="Copiar guion completo al portapapeles"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-green-600">¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                <span>Copiar guion</span>
              </>
            )}
          </button>

          {/* Descargar como .txt */}
          <button
            onClick={handleDownload}
            className="
              flex items-center gap-2 px-5 py-3
              bg-christmas-green-700 hover:bg-christmas-green-600
              text-christmas-cream-100
              rounded-lg font-medium
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-christmas-gold-400 focus:ring-offset-2
              shadow-sm hover:shadow
            "
            aria-label="Descargar guion como archivo de texto"
          >
            <Download className="w-5 h-5" />
            <span>Descargar .txt</span>
          </button>

          {/* Imprimir */}
          <button
            onClick={handlePrint}
            className="
              flex items-center gap-2 px-5 py-3
              bg-christmas-gold-500 hover:bg-christmas-gold-400
              text-christmas-green-800
              rounded-lg font-bold
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-christmas-gold-300 focus:ring-offset-2
              shadow-sm hover:shadow
            "
            aria-label="Imprimir guion"
          >
            <Printer className="w-5 h-5" />
            <span>Imprimir</span>
          </button>
        </div>
      </div>
    </section>
  );
}
