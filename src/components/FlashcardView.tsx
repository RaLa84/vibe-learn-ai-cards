
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Flashcard } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Trash, MoreVertical } from "lucide-react";

interface FlashcardViewProps {
  card: Flashcard;
  onEdit: () => void;
  onDelete: () => void;
  onUpdateDifficulty: (id: string, difficulty: Flashcard["difficulty"]) => void;
}

export const FlashcardView = ({
  card,
  onEdit,
  onDelete,
  onUpdateDifficulty,
}: FlashcardViewProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative min-h-[200px]">
      <div
        className="w-full h-full cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="text-lg font-medium mb-4">
          {isFlipped ? "Antwort:" : "Frage:"}
        </div>
        <p className="text-gray-700">
          {isFlipped ? card.answer : card.question}
        </p>
      </div>

      <div className="absolute top-0 right-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={onEdit}>
              <Edit className="mr-2 h-4 w-4" />
              Bearbeiten
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete}>
              <Trash className="mr-2 h-4 w-4" />
              Löschen
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isFlipped && (
        <div className="mt-4 space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onUpdateDifficulty(card.id, "einfach")}
          >
            Einfach
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onUpdateDifficulty(card.id, "medium")}
          >
            Medium
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onUpdateDifficulty(card.id, "schwer")}
          >
            Schwer
          </Button>
        </div>
      )}
    </div>
  );
};
