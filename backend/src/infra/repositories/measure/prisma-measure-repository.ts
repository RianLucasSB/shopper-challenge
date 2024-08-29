import { Measure } from '../../../domain/entities/measure';
import { MeasureRepository } from '../../../domain/repositories/measure-repository';

export class MeasureRepositoryPrisma implements MeasureRepository {
  async save(measure: Measure): Promise<boolean> {
    return true;
  }
}
