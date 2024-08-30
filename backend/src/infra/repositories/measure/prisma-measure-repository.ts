import { PrismaClient } from "@prisma/client";
import { Measure, MeasureType } from '../../../domain/entities/measure';
import { MeasureRepository } from '../../../domain/repositories/measure-repository';

export class MeasureRepositoryPrisma implements MeasureRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async listByCustomerCodeAndMeasureType(code: string, measureType?: MeasureType): Promise<Measure[] | null> {
    let measures = null
    if(measureType) {
      measures = await this.prismaClient.measure.findMany({
        where: {
          customerCode: code,
          type: measureType,
        }
      })
    } else {
      measures = await this.prismaClient.measure.findMany({
        where: {
          customerCode: code,
        }
      })
    }
    if(measures?.length > 0){
      return measures.map(measure => {
        return new Measure({
          customerCode: measure.customerCode,
          date: measure.date,
          imageUrl: "",
          isConfirmed: measure.isConfirmed,
          type: measure.type as MeasureType,
          uuid: measure.uuid,
          value: measure.value
        })
      })
    }
    return null
  }

  async findByDateAndType(date: Date, measureType: MeasureType): Promise<Measure | null> {
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const endDate = this.getNextMonthDate(date);
    const foundMeasure = await this.prismaClient.measure.findFirst({where: {
      date: {
        gte: startDate,
        lt: endDate,
      },
      type: measureType
    }})

    if(!foundMeasure) return null

    const {customerCode, date: foundDate, imageUrl, isConfirmed, type, uuid, value} = foundMeasure
    return new Measure({
      uuid,
      customerCode,
      date: foundDate, 
      isConfirmed,
      type: type as MeasureType,
      imageUrl,
      value
    });
  }

  async findById(id: string): Promise<Measure | null> {
    const foundMeasure = await this.prismaClient.measure.findUnique({where: {uuid: id}})
    if(!foundMeasure) return null
    const {customerCode, date, imageUrl, isConfirmed, type, uuid, value} = foundMeasure
    return new Measure({
      uuid,
      customerCode,
      date, 
      isConfirmed,
      type: type as MeasureType,
      imageUrl,
      value
    });
  }

  async save(measure: Measure): Promise<boolean> {
    const alreadyExists = await this.findByDateAndType(measure.date, measure.type)
    if(alreadyExists) return false   
    await this.prismaClient.measure.create({
      data: {
        customerCode: measure.customerCode,
        date: measure.date,
        imageUrl: "",
        isConfirmed: measure.isConfirmed,
        type: measure.type,
        uuid: measure.uuid,
        value: measure.value
      }
    })
    return true;
  }

  async confirm(id: string, value: number): Promise<boolean> {
    const measure = await this.findById(id)

    if(!measure) return false

    await this.prismaClient.measure.update({
      where: {uuid: id},
      data: {
        isConfirmed: true,
        value
      }
    })

    return true
  }

  private getNextMonthDate(date: Date){
    const month = date.getMonth()
    if (month === 12){
      return new Date(date.getFullYear(), 1, 1)
    }

    return new Date(date.getFullYear(), month + 1, 1)
  }
}
