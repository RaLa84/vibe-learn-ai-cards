
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Flashcard, Difficulty } from "@/types";
import { Plus } from "lucide-react";

interface CreateCardDialogProps {
  onSave: (card: Omit<Flashcard, "id" | "lastReviewed">) => void;
  existingCard?: Flashcard;
}

export const CreateCardDialog = ({ onSave, existingCard }: CreateCardDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    question: existingCard?.question || "",
    answer: existingCard?.answer || "",
    topic: existingCard?.topic || "",
    difficulty: existingCard?.difficulty || "medium" as Difficulty,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setOpen(false);
    setFormData({
      question: "",
      answer: "",
      topic: "",
      difficulty: "medium",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Neue Karte
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {existingCard ? "Karte bearbeiten" : "Neue Karte erstellen"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Thema</Label>
            <Input
              id="topic"
              value={formData.topic}
              onChange={(e) =>
                setFormData({ ...formData, topic: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="question">Frage</Label>
            <Textarea
              id="question"
              value={formData.question}
              onChange={(e) =>
                setFormData({ ...formData, question: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="answer">Antwort</Label>
            <Textarea
              id="answer"
              value={formData.answer}
              onChange={(e) =>
                setFormData({ ...formData, answer: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="difficulty">Schwierigkeitsgrad</Label>
            <Select
              value={formData.difficulty}
              onValueChange={(value: Difficulty) =>
                setFormData({ ...formData, difficulty: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Schwierigkeit wählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="einfach">Einfach</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="schwer">Schwer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            {existingCard ? "Aktualisieren" : "Erstellen"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
