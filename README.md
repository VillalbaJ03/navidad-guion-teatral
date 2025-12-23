# 🎄 La Navidad que el mundo olvidó… y volvió a recordar

> Guion Teatral Navideño Cristiano

Una aplicación web interactiva para presentar y administrar el guion teatral navideño cristiano. Perfecta para iglesias y escuelas.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css)

## ✨ Características

### 📖 Vista del Guion
- **Portada atractiva** con el título, subtítulo y frase central
- **Lista de personajes** con actores asignados y colores identificativos
- **Escenas en acordeón** con diálogos formateados en estilo teatral
- **Acotaciones escénicas** claramente diferenciadas
- **Mensaje final** destacado

### 🎭 Modo Ensayo
- Selector de personaje para practicar
- Líneas del personaje resaltadas con contexto visible
- Navegación entre líneas (anterior/siguiente)
- Indicador de progreso
- Atajos de teclado para navegación rápida

### 📽️ Modo Proyección
- Pantalla completa para mostrar en escenario
- Fuente grande y alto contraste
- Navegación entre diálogos
- Soporte para teclas de flecha y espacio

### 🔍 Búsqueda
- Buscar por palabra clave en todo el guion
- Resultados con resaltado de coincidencias
- Navegación directa a la escena/diálogo

### 📤 Exportación
- **Copiar al portapapeles** el guion completo
- **Descargar como .txt** con formato teatral
- **Imprimir** con CSS optimizado para impresión

### ♿ Accesibilidad
- Navegación completa por teclado
- Roles ARIA apropiados
- Contraste de colores AAA
- Skip links para usuarios de lectores de pantalla

## 🚀 Instalación

### Requisitos
- Node.js 18.17 o superior
- npm, yarn, pnpm o bun

### Pasos

1. **Navega al directorio del proyecto:**
```bash
cd "Navidad y el Grinch"
```

2. **Instala las dependencias:**
```bash
npm install
```

3. **Inicia el servidor de desarrollo:**
```bash
npm run dev
```

4. **Abre tu navegador en:**
```
http://localhost:3000
```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── globals.css      # Estilos globales + Tailwind
│   ├── layout.tsx       # Layout principal con fuentes
│   └── page.tsx         # Página principal
├── components/
│   ├── Header.tsx       # Navegación principal
│   ├── Footer.tsx       # Pie de página
│   ├── Hero.tsx         # Portada con CTA
│   ├── CastList.tsx     # Lista de personajes
│   ├── SceneAccordion.tsx   # Acordeón de escenas
│   ├── DialogueBlock.tsx    # Bloque de diálogo
│   ├── StageDirectionBlock.tsx  # Acotación escénica
│   ├── FinalMessage.tsx # Mensaje final
│   ├── RehearsalMode.tsx    # Modo ensayo
│   ├── ProjectionMode.tsx   # Modo proyección
│   ├── ExportBar.tsx    # Botones de exportación
│   ├── Search.tsx       # Buscador
│   └── index.ts         # Exports centralizados
├── data/
│   └── script.ts        # Datos del guion completo
├── types/
│   └── index.ts         # Tipos TypeScript
└── utils/
    ├── storage.ts       # Persistencia localStorage
    ├── export.ts        # Funciones de exportación
    ├── search.ts        # Lógica de búsqueda
    └── index.ts         # Exports centralizados
```

## 🎨 Personalización

### Modificar el Guion
Edita el archivo `src/data/script.ts` para:
- Cambiar personajes y actores
- Modificar escenas y diálogos
- Actualizar el mensaje final

### Modificar Estilos
- Paleta de colores en `tailwind.config.ts`
- Estilos globales en `src/app/globals.css`
- Fuentes en `src/app/layout.tsx`

## 🖨️ Impresión

La aplicación incluye estilos CSS optimizados para impresión:
- Se ocultan elementos interactivos
- Todas las escenas se expanden automáticamente
- Formato de página letter con márgenes apropiados
- Evita cortes de página en diálogos

Para imprimir: haz clic en "Imprimir" o usa `Ctrl+P`.

## ⌨️ Atajos de Teclado

| Tecla | Acción |
|-------|--------|
| `Ctrl+K` | Abrir búsqueda |
| `←` `→` | Navegar líneas (modo ensayo/proyección) |
| `Espacio` | Siguiente línea |
| `F` | Pantalla completa (modo proyección) |
| `Esc` | Cerrar modo/búsqueda |

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Compilar para producción
npm run build

# Iniciar servidor de producción
npm run start

# Linter
npm run lint
```

## 📜 Licencia

Este proyecto es para uso en iglesias y escuelas con fines educativos y de evangelización.

---

> *"La Navidad no es lo que recibimos, sino a Quién recibimos."*

🌟 ¡Que Dios bendiga su presentación! 🎄
