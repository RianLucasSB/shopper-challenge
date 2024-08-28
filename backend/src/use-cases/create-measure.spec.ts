import { randomUUID } from "crypto"
import { CreateMeasure, CreateMeasureResponse } from "./create-measure"
import { MeasureType } from "../domain/entities/measure"

const makeSut = () => {
  return new CreateMeasure()
}

describe('CreateMeasure', () => {
  it('should be able to create measure with valid values', () => {
    const createMeasureSut = makeSut()

    const body = {
      customer_code: randomUUID().toString(),
      image: 'valid_image',
      measure_datetime: '2011-10-05T14:48:00.000Z',
      measure_type: MeasureType.GAS
    }

    expect(createMeasureSut.execute(body)).resolves.toBeTruthy()
  })
})
