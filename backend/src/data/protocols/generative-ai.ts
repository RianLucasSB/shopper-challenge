import { MeasureType } from '../../domain/entities/measure';

export interface GenerativeAi {
  extractValueFromImage(image: string, measureType: MeasureType): Promise<number>;
}
