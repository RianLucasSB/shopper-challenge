import { Measure } from "../entities/measure";

export interface MeasureRepository {
  save(measure: Measure): Promise<boolean>
}