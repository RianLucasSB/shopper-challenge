import { randomUUID } from "crypto";
import { Measure, MeasureType } from "../domain/entities/measure";

export interface CreateMeasureRequest {
    customer_code: string
    image: string 
    measure_datetime: string
    measure_type: string
}

export interface CreateMeasureResponse {
  image_url: string 
  measure_value: number
  measure_uuid: string
}

export class CreateMeasure {
  async execute({
    customer_code, 
    image, 
    measure_datetime, 
    measure_type
  }: CreateMeasureRequest): Promise<CreateMeasureResponse>{
    const measureType = MeasureType[measure_type.toUpperCase() as  keyof typeof MeasureType]
    const measure = new Measure({
      customerCode: customer_code, 
      date: new Date(measure_datetime),
      type: measureType,
      uuid: randomUUID().toString()
    })

    return {
      image_url: "",
      measure_uuid: measure.uuid,
      measure_value: Math.random() * 10
    }
  }
}