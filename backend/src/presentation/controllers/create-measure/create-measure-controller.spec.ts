import { randomUUID } from "crypto"
import { CreateMeasureController } from "./create-measure-controller"

const makeSut = () => {
  return new CreateMeasureController()
}

describe('CreateMeasureController', () => {
  it('should return 400 if missing image param', async () => {
    const sut = makeSut()

    const body = {
      customer_code: randomUUID().toString(),
      measure_datetime: '2011-10-05T14:48:00.000Z',
      measure_type: 'GAS'
    }

    expect(sut.handle(body))
  })
})
