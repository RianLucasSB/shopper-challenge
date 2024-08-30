import { Measure, MeasureType } from "../../domain/entities/measure";
import { MeasureRepository } from "../../domain/repositories/measure-repository";

export class InMemoryRepository implements MeasureRepository {
  private data: Measure[] = [new Measure({
    uuid: '123e4567-e89b-12d3-a456-426614174000',
    date: new Date('2024-02-05T14:48:00.000Z'),
    type: MeasureType.GAS,
    customerCode: "1",
    isConfirmed: false
  })];

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

  async confirm(id: string): Promise<boolean> {
    const measure = await this.findById(id)

    if(!measure) return false

    measure.isConfirmed = true

    return true
  }

  async listByCustomerCodeAndMeasureType(code: string, measureType?: MeasureType): Promise<Measure[] | null> {
    const measures = this.data.filter(m => {
      if(measureType){
        return m.customerCode === code && m.type === measureType
      }

      return m.customerCode === code
    })

    if(measures.length <= 0){
      return null
    }

    return measures
  }
}
