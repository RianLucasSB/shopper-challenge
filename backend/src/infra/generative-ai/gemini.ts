import { GenerativeAi } from "../../data/protocols/generative-ai";

export class GeminiGenerativeAi implements GenerativeAi {
  async extractValueFromImage(image: File): Promise<number> {
    throw new Error("Method not implemented.");
  }
}