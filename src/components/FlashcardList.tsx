
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Flashcard } from "@/types";
import { FlashcardView } from "./FlashcardView";
import { cn } from "@/lib/utils";

interface FlashcardListProps {
  cards: Flashcard[];
  onEdit: (card: Flashcard) => void;
  onDelete: (id: string) => void;
  onUpdateDifficulty: (id: string, difficulty: Flashcard["difficulty"]) => void;
}

export const FlashcardList = ({
  cards,
  onEdit,
  onDelete,
  onUpdateDifficulty,
}: FlashcardListProps) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const topics = Array.from(new Set(cards.map((card) => card.topic)));

  const filteredCards = selectedTopic
    ? cards.filter((card) => card.topic === selectedTopic)
    : cards;

  const getDifficultyColor = (difficulty: Flashcard["difficulty"]) => {
    switch (difficulty) {
      case "einfach":
        return "bg-[#F2FCE2] text-green-700";
      case "medium":
        return "bg-[#FEF7CD] text-yellow-700";
      case "schwer":
        return "bg-[#FFDEE2] text-red-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 flex-wrap">
        <Filter className="h-5 w-5 text-gray-500" />
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedTopic === null ? "default" : "outline"}
            onClick={() => setSelectedTopic(null)}
            size="sm"
          >
            Alle
          </Button>
          {topics.map((topic) => (
            <Button
              key={topic}
              variant={selectedTopic === topic ? "default" : "outline"}
              onClick={() => setSelectedTopic(topic)}
              size="sm"
            >
              {topic}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCards.map((card) => (
          <Card key={card.id} className="relative">
            <CardContent className="pt-6">
              <FlashcardView
                card={card}
                onEdit={() => onEdit(card)}
                onDelete={() => onDelete(card.id)}
                onUpdateDifficulty={onUpdateDifficulty}
              />
              <Badge className={cn("absolute top-2 right-2", getDifficultyColor(card.difficulty))}>
                {card.difficulty}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
