import { Measure, MeasureType } from '../../../domain/entities/measure';
import { MeasureRepository } from '../../../domain/repositories/measure-repository';

export class MeasureRepositoryPrisma implements MeasureRepository {
  async findByMonthAndType(month: number, measureType: MeasureType): Promise<Measure | null> {
    return null;
  }
  async findById(id: string): Promise<Measure | null> {
    return null;
  }
  async save(measure: Measure): Promise<boolean> {
    return true;
  }

  confirm(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
