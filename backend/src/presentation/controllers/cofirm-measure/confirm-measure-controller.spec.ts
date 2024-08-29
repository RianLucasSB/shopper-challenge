import { randomUUID } from 'crypto';
import { Measure, MeasureType } from '../../../domain/entities/measure';
import { GenerativeAi } from '../../../data/protocols/generative-ai';
import { InMemoryRepository } from '../../../tests/repositories/measure-in-memory-repository';
import { ConfirmMeasureController } from './confirm-measure-controller';

interface SutTypes {
  sut: ConfirmMeasureController;
}
const makeSut = (): SutTypes => {
  const sut = new ConfirmMeasureController(makeInMemoryRepository());

  return {
    sut,
  };
};

const existingUUID = '123e4567-e89b-12d3-a456-426614174000'

const makeInMemoryRepository = () => {
  return new InMemoryRepository();
};

describe('ConfirmMeasureController', () => {
  it('should return 200 if valid data is provided', async () => {
    const { sut } = makeSut();

    const body = {
      confirmed_value: 221,
      measure_uuid: existingUUID
    }

    const response = await sut.handle(body);

    expect(response.body).toHaveProperty('success', true);
    expect(response.statusCode).toBe(200);
  });

  it('should return 404 if not exists measure for provided measure_uuid', async () => {
    const { sut } = makeSut();

    const body = {
      confirmed_value: 221,
      measure_uuid: randomUUID.toString()
    }

    const response = await sut.handle(body);

    expect(response.body).toHaveProperty('error_code', 'MEASURE_NOT_FOUND');
  });

  it('should return 400 if missing measure_uuid param', async () => {
    const { sut } = makeSut();

    const body = {
      confirmed_value: 221
    }

    const response = await sut.handle(body);

    expect(response.body).toHaveProperty('error_code', 'INVALID_DATA');
  });

  it('should return 400 if missing confirmed_value param', async () => {
    const { sut } = makeSut();

    const body = {
      measure_uuid: existingUUID,
    }

    const response = await sut.handle(body);

    expect(response.body).toHaveProperty('error_code', 'INVALID_DATA');
  });
});
