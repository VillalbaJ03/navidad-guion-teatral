"use client";

import { Clapperboard } from "lucide-react";
import { StageDirection } from "@/types";
import { highlightText } from "@/utils/search";

interface StageDirectionBlockProps {
  direction: StageDirection;
  searchQuery?: string;
  fontSize?: "normal" | "large" | "xlarge";
}

export default function StageDirectionBlock({
  direction,
  searchQuery = "",
  fontSize = "normal",
}: StageDirectionBlockProps) {
  const fontSizeClasses = {
    normal: "text-sm",
    large: "text-lg",
    xlarge: "text-2xl",
  };

  const renderText = (text: string) => {
    if (searchQuery) {
      return (
        <span 
          dangerouslySetInnerHTML={{ 
            __html: highlightText(text, searchQuery) 
          }} 
        />
      );
    }
    return text;
  };

  return (
    <div 
      className={`
        flex items-start gap-3 
        px-4 py-3 
        bg-christmas-green-50 
        rounded-lg 
        border border-christmas-green-100
        ${fontSizeClasses[fontSize]}
      `}
      role="note"
      aria-label="Acotación escénica"
    >
      <Clapperboard 
        className="w-4 h-4 flex-shrink-0 text-christmas-green-500 mt-0.5" 
        aria-hidden="true" 
      />
      <p className="italic text-christmas-green-700">
        [{renderText(direction.text)}]
      </p>
    </div>
  );
}
