import { atom } from "jotai";
import type { Question, User } from "../types";

export const progressAtom = atom<number>(100);

export const themeAtom = atom<string>("dark");

export const loadingAtom = atom<boolean>(false);

export const questionAtom = atom<Question | null>(null);

export const stepAtom = atom<number>(0);

export const selectedOptionAtom = atom<string>("");

export const validationAtom = atom<boolean>(false);

export const userAtom = atom<User | null>(null);
