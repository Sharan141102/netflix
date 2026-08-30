import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_KEY } from "./constants";

const genAI = new GoogleGenerativeAI(GEMINI_KEY);

export const geminiModel = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });
