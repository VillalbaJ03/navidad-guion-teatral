import { Script, Scene, isDialogue, isStageDirection } from "@/types";

/**
 * Genera el texto completo del guion en formato teatral
 */
export function generateScriptText(script: Script): string {
  const lines: string[] = [];
  
  // Título
  lines.push("═".repeat(60));
  lines.push("");
  lines.push(script.title.toUpperCase());
  if (script.subtitle) {
    lines.push(script.subtitle);
  }
  lines.push("");
  lines.push(`"${script.centralPhrase}"`);
  lines.push("");
  lines.push("═".repeat(60));
  lines.push("");
  
  // Personajes
  lines.push("PERSONAJES:");
  lines.push("─".repeat(40));
  script.characters.forEach((char) => {
    lines.push(`  ${char.name} — ${char.actor}`);
  });
  lines.push("");
  lines.push("═".repeat(60));
  lines.push("");
  
  // Escenas
  script.scenes.forEach((scene) => {
    lines.push(`ESCENA ${scene.number}: "${scene.title}"`);
    lines.push("─".repeat(40));
    lines.push("");
    
    scene.content.forEach((content) => {
      if (isStageDirection(content)) {
        lines.push(`[${content.text}]`);
        lines.push("");
      } else if (isDialogue(content)) {
        const direction = content.direction ? ` (${content.direction})` : "";
        lines.push(`${content.characterName.toUpperCase()} (${content.actor}${direction}):`);
        content.lines.forEach((line) => {
          lines.push(`  "${line}"`);
        });
        lines.push("");
      }
    });
    
    lines.push("");
  });
  
  // Mensaje final
  lines.push("═".repeat(60));
  lines.push("MENSAJE FINAL:");
  lines.push("─".repeat(40));
  lines.push("");
  lines.push(`${script.finalMessage.characterName.toUpperCase()} (${script.finalMessage.actor}):`);
  script.finalMessage.lines.forEach((line) => {
    lines.push(`  "${line}"`);
  });
  lines.push("");
  lines.push("═".repeat(60));
  lines.push("");
  lines.push("FIN");
  lines.push("");
  
  return lines.join("\n");
}

/**
 * Copia el texto al portapapeles
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Error copying to clipboard:", error);
    // Fallback para navegadores antiguos
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      return true;
    } catch (fallbackError) {
      console.error("Fallback copy failed:", fallbackError);
      return false;
    }
  }
}

/**
 * Descarga el guion como archivo .txt
 */
export function downloadAsText(script: Script): void {
  const text = generateScriptText(script);
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = url;
  link.download = "guion-navidad.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}

/**
 * Abre la ventana de impresión
 */
export function printScript(): void {
  window.print();
}
