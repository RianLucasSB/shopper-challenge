export interface GenerativeAi {
  extractValueFromImage(image: File): Promise<number>
}