
export type Difficulty = "einfach" | "medium" | "schwer";

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  topic: string;
  difficulty: Difficulty;
  lastReviewed: Date;
}

export const INITIAL_CARDS: Flashcard[] = [
  {
    id: "1",
    question: "Was ist ein neuronales Netz?",
    answer: "Ein künstliches neuronales Netz ist ein Computersystem, das von biologischen neuronalen Netzen inspiriert ist. Es besteht aus miteinander verbundenen Knoten (Neuronen), die Informationen verarbeiten und weitergeben können.",
    topic: "Grundlagen",
    difficulty: "medium",
    lastReviewed: new Date("2024-01-01"),
  },
  {
    id: "2",
    question: "Was ist supervised learning?",
    answer: "Supervised Learning ist eine Methode des maschinellen Lernens, bei der der Algorithmus mit gekennzeichneten Trainingsdaten arbeitet. Der Algorithmus lernt, Muster in den Daten zu erkennen und Vorhersagen für neue, unbekannte Daten zu treffen.",
    topic: "Maschinelles Lernen",
    difficulty: "einfach",
    lastReviewed: new Date("2024-01-02"),
  },
  {
    id: "3",
    question: "Was ist der Unterschied zwischen KI und Machine Learning?",
    answer: "Künstliche Intelligenz (KI) ist der übergeordnete Begriff für Systeme, die menschenähnliche Intelligenz simulieren. Machine Learning ist ein Teilbereich der KI, der sich darauf konzentriert, wie Systeme automatisch aus Erfahrungen lernen und sich verbessern können.",
    topic: "Grundlagen",
    difficulty: "schwer",
    lastReviewed: new Date("2024-01-03"),
  },
];
