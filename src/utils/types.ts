import { Dispatch, SetStateAction } from "react";

export type IndexProps = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  user: User | null;
};

export type Question = {
  id: string;
  question: string;
  options: Array<{
    label: string;
    value: string;
    isCorrect: boolean;
  }>;
};

export type User = {
  username?: string | null | undefined;
  previousScores?: Array<{
    date: Date;
    score: number;
  }>;
};

export type Account = {
  username: string | null;
  password: string | null;
};

export type StatOptions = {
  score: number;
  correctAnswer: string | undefined;
  question: string | undefined;
  answer: string | undefined;
};
