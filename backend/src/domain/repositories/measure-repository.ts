import { Measure, MeasureType } from '../entities/measure';

export interface MeasureRepository {
  save(measure: Measure): Promise<boolean>;
  findByMonthAndType(month: number, measureType: MeasureType): Promise<Measure | null>
  findById(id: string): Promise<Measure | null>
  confirm(id: string): Promise<boolean>
  listByCustomerCodeAndMeasureType(code: string, measureType?: MeasureType): Promise<Measure[] | null>
}
