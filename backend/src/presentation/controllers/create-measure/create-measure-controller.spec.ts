import { randomUUID } from "crypto"
import { CreateMeasureController } from "./create-measure-controller"

const makeSut = () => {
  return new CreateMeasureController()
}

describe('CreateMeasureController', () => {
  it('should return 400 if invalid image param', async () => {
    const sut = makeSut()

    const body = {
      customer_code: randomUUID().toString(),
      measure_datetime: '2011-10-05T14:48:00.000Z',
      measure_type: 'GAS'
    }

    expect(sut.handle(body))
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
