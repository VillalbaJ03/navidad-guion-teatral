import { Script, Scene, SearchResult, isDialogue, isStageDirection } from "@/types";

/**
 * Busca en el guion por palabra clave
 * Retorna resultados con contexto
 */
export function searchScript(script: Script, query: string): SearchResult[] {
  if (!query.trim()) {
    return [];
  }

  const results: SearchResult[] = [];
  const searchTerm = query.toLowerCase().trim();

  script.scenes.forEach((scene) => {
    scene.content.forEach((content) => {
      if (isStageDirection(content)) {
        if (content.text.toLowerCase().includes(searchTerm)) {
          results.push({
            sceneId: scene.id,
            sceneNumber: scene.number,
            sceneTitle: scene.title,
            contentId: content.id,
            matchedText: content.text,
            type: "stage-direction",
          });
        }
      } else if (isDialogue(content)) {
        const fullText = content.lines.join(" ");
        if (
          fullText.toLowerCase().includes(searchTerm) ||
          content.characterName.toLowerCase().includes(searchTerm) ||
          content.actor.toLowerCase().includes(searchTerm)
        ) {
          results.push({
            sceneId: scene.id,
            sceneNumber: scene.number,
            sceneTitle: scene.title,
            contentId: content.id,
            matchedText: `${content.characterName}: ${fullText}`,
            type: "dialogue",
          });
        }
      }
    });
  });

  // Buscar en mensaje final
  const finalText = script.finalMessage.lines.join(" ");
  if (
    finalText.toLowerCase().includes(searchTerm) ||
    script.finalMessage.characterName.toLowerCase().includes(searchTerm)
  ) {
    results.push({
      sceneId: "final-message",
      sceneNumber: 0,
      sceneTitle: "Mensaje Final",
      contentId: script.finalMessage.id,
      matchedText: `${script.finalMessage.characterName}: ${finalText}`,
      type: "dialogue",
    });
  }

  return results;
}

/**
 * Resalta el texto coincidente con la búsqueda
 */
export function highlightText(text: string, query: string): string {
  if (!query.trim()) return text;
  
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escapedQuery})`, "gi");
  
  return text.replace(regex, '<mark class="bg-christmas-gold-300 px-0.5 rounded">$1</mark>');
}

/**
 * Verifica si una escena contiene coincidencias
 */
export function sceneMatchesSearch(scene: Scene, query: string): boolean {
  if (!query.trim()) return true;
  
  const searchTerm = query.toLowerCase().trim();
  
  return scene.content.some((content) => {
    if (isStageDirection(content)) {
      return content.text.toLowerCase().includes(searchTerm);
    } else if (isDialogue(content)) {
      const fullText = content.lines.join(" ");
      return (
        fullText.toLowerCase().includes(searchTerm) ||
        content.characterName.toLowerCase().includes(searchTerm) ||
        content.actor.toLowerCase().includes(searchTerm)
      );
    }
    return false;
  });
}
