import { randomUUID } from "crypto";
import { Measure, MeasureType } from "../../domain/entities/measure";
import { MeasureRepository } from "../../domain/repositories/measure-repository";

export class InMemoryRepository implements MeasureRepository {
  private data: Measure[] = [new  Measure({
    uuid: randomUUID().toString(),
    date: new Date('2024-02-05T14:48:00.000Z'),
    type: MeasureType.GAS,
    customerCode: "1"
  })
];

  async findByMonthAndType(month: number, measureType: MeasureType): Promise<Measure | null> {
    const measure = this.data.find(m => m.date.getMonth() === month && measureType === m.type);
    if(!measure) return null
    return measure
  }

  async findById(id: string): Promise<Measure | null> {
    const measure = this.data.find(m => m.uuid === id);
    if(!measure) return null
    return measure
  }

  async save(measure: Measure): Promise<boolean> {
    const alreadyExists = await this.findByMonthAndType(measure.date.getMonth(), measure.type);
    if (alreadyExists) {
      return false;
    }
    this.data.push(measure);
    return true;
  }
}
