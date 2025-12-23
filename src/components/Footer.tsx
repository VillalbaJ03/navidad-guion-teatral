import { Heart, Star } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="bg-christmas-green-800 text-christmas-cream-100 py-8 mt-auto print:bg-white print:text-christmas-green-800 print:py-4"
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          {/* Decoración */}
          <div className="flex items-center gap-2" aria-hidden="true">
            <Star className="w-4 h-4 text-christmas-gold-400" />
            <Star className="w-5 h-5 text-christmas-gold-300" />
            <Star className="w-4 h-4 text-christmas-gold-400" />
          </div>

          {/* Mensaje */}
          <p className="text-center text-christmas-cream-200 font-serif italic">
            &ldquo;La Navidad no es lo que recibimos, sino a Quién recibimos.&rdquo;
          </p>

          {/* Créditos */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-christmas-cream-300">
            <span>Guion Teatral Navideño Cristiano</span>
            <span className="hidden sm:inline" aria-hidden="true">•</span>
            <span className="flex items-center gap-1">
              Hecho con <Heart className="w-4 h-4 text-christmas-red-500 inline" aria-label="amor" /> para la gloria de Dios
            </span>
          </div>

          {/* Año */}
          <p className="text-xs text-christmas-cream-400">
            © {currentYear} - Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
