import { randomUUID } from "crypto"
import { CreateMeasureController } from "./create-measure-controller"
import { MeasureRepository } from "../../../domain/repositories/measure-repository"
import { Measure } from "../../../domain/entities/measure"

const makeSut = () => {
  return new CreateMeasureController(makeInMemoryRepository())
}

const makeInMemoryRepository = () => {
  class InMemoryRepository implements MeasureRepository {
    private data: Measure[] = []

    async save(measure: Measure): Promise<boolean> {
      const alreadyExists = this.data.find(m => 
        m.type === measure.type 
        && m.date.getMonth === measure.date.getMonth)
      if(alreadyExists){
        return false
      }
      this.data.push(measure)
      return true
    }
    
  }

  return new InMemoryRepository()
}

describe('CreateMeasureController', () => {
  it('should return 200 if valid data is provided', async () => {
    const sut = makeSut()

    const body = {
      image: "valid_image",
      customer_code: randomUUID().toString(),
      measure_datetime: '2011-10-05T14:48:00.000Z',
      measure_type: 'GAS'
    }

    const response = await sut.handle(body)

    expect(response.statusCode).toBe(200)
  })

  it('should return 409 if already exists a measure of provided measure type for the month provided', async () => {
    const sut = makeSut()

    const body = {
      image: "valid_image",
      customer_code: randomUUID().toString(),
      measure_datetime: '2024-10-05T14:48:00.000Z',
      measure_type: 'GAS'
    }

    const secondBody = {
      image: "valid_image",
      customer_code: randomUUID().toString(),
      measure_datetime: '2024-10-16T14:48:00.000Z',
      measure_type: 'GAS'
    }

    await sut.handle(body)
    const response = await sut.handle(secondBody)

    expect(response.statusCode).toBe(409)
    expect(response.body).toHaveProperty('error_code', 'DOUBLE_REPORT')
  })

  it('should return 400 if invalid measure type is provided', async () => {
    const sut = makeSut()

    const body = {
      image: "valid_image",
      customer_code: randomUUID().toString(),
      measure_datetime: '2011-10-05T14:48:00.000Z',
      measure_type: 'invalid_measure'
    }

    const response = await sut.handle(body)

    expect(response.body).toHaveProperty('error_code', 'INVALID_DATA')
  })

  it('should return 400 if invalid measure type is provided', async () => {
    const sut = makeSut()

    const body = {
      image: "valid_image",
      customer_code: randomUUID().toString(),
      measure_datetime: '2011-10-05T14:48:00.000Z',
      measure_type: 'invalid_measure'
    }

    const response = await sut.handle(body)

    expect(response.body).toHaveProperty('error_code', 'INVALID_DATA')
  })

  it('should return 400 if missing image param', async () => {
    const sut = makeSut()

    const body = {
      customer_code: randomUUID().toString(),
      measure_datetime: '2011-10-05T14:48:00.000Z',
      measure_type: 'GAS'
    }

    const response = await sut.handle(body)

    expect(response.body).toHaveProperty('error_code', 'INVALID_DATA')
  })

  it('should return 400 if missing customer_code param', async () => {
    const sut = makeSut()

    const body = {
      image: "valid_image",
      measure_datetime: '2011-10-05T14:48:00.000Z',
      measure_type: 'GAS'
    }

    const response = await sut.handle(body)

    expect(response.body).toHaveProperty('error_code', 'INVALID_DATA')
  })

  it('should return 400 if missing measure_datetime param', async () => {
    const sut = makeSut()

    const body = {
      customer_code: randomUUID().toString(),
      image: "valid_image",
      measure_type: 'GAS'
    }

    const response = await sut.handle(body)

    expect(response.body).toHaveProperty('error_code', 'INVALID_DATA')
  })

  it('should return 400 if missing measure_type param', async () => {
    const sut = makeSut()

    const body = {
      customer_code: randomUUID().toString(),
      measure_datetime: '2011-10-05T14:48:00.000Z',
      image: "valid_image",
    }

    const response = await sut.handle(body)

    expect(response.body).toHaveProperty('error_code', 'INVALID_DATA')
  })
})
