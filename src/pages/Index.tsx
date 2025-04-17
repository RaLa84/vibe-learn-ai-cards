
import { useState } from "react";
import { CreateCardDialog } from "@/components/CreateCardDialog";
import { FlashcardList } from "@/components/FlashcardList";
import { INITIAL_CARDS, Flashcard } from "@/types";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [cards, setCards] = useState<Flashcard[]>(INITIAL_CARDS);
  const { toast } = useToast();

  const handleCreateCard = (
    newCard: Omit<Flashcard, "id" | "lastReviewed">
  ) => {
    const card: Flashcard = {
      ...newCard,
      id: Math.random().toString(36).substring(7),
      lastReviewed: new Date(),
    };
    setCards((prev) => [...prev, card]);
    toast({
      title: "Karte erstellt",
      description: "Die neue Lernkarte wurde erfolgreich erstellt.",
    });
  };

  const handleEditCard = (
    editedCard: Omit<Flashcard, "id" | "lastReviewed">,
    id: string
  ) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === id
          ? { ...card, ...editedCard, lastReviewed: new Date() }
          : card
      )
    );
    toast({
      title: "Karte aktualisiert",
      description: "Die Lernkarte wurde erfolgreich aktualisiert.",
    });
  };

  const handleDeleteCard = (id: string) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
    toast({
      title: "Karte gelöscht",
      description: "Die Lernkarte wurde erfolgreich gelöscht.",
    });
  };

  const handleUpdateDifficulty = (id: string, difficulty: Flashcard["difficulty"]) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === id
          ? { ...card, difficulty, lastReviewed: new Date() }
          : card
      )
    );
    toast({
      title: "Schwierigkeit aktualisiert",
      description: "Der Schwierigkeitsgrad wurde erfolgreich aktualisiert.",
    });
  };

  // Sortiere Karten nach Datum (älteste zuerst) und dann nach Schwierigkeit
  const sortedCards = [...cards].sort((a, b) => {
    // Primär nach Datum sortieren
    const dateComparison = a.lastReviewed.getTime() - b.lastReviewed.getTime();
    if (dateComparison !== 0) return dateComparison;

    // Sekundär nach Schwierigkeit sortieren
    const difficultyOrder = { schwer: 0, medium: 1, einfach: 2 };
    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
  });

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">KI Vibe</h1>
        <CreateCardDialog onSave={handleCreateCard} />
      </div>
      <FlashcardList
        cards={sortedCards}
        onEdit={(card) => {
          const dialog = (
            <CreateCardDialog
              existingCard={card}
              onSave={(editedCard) => handleEditCard(editedCard, card.id)}
            />
          );
          return dialog;
        }}
        onDelete={handleDeleteCard}
        onUpdateDifficulty={handleUpdateDifficulty}
      />
    </div>
  );
};

export default Index;
