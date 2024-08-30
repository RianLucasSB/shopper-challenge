import { Measure, MeasureType } from '../../../domain/entities/measure';
import { InMemoryRepository } from '../../../tests/repositories/measure-in-memory-repository';
import { ListMeasuresController } from './list-measures-controller';

interface SutTypes {
  sut: ListMeasuresController;
}
const makeSut = (): SutTypes => {
  const sut = new ListMeasuresController(makeInMemoryRepository());

  return {
    sut,
  };
};

const existingUUID = '123e4567-e89b-12d3-a456-426614174000'

const makeInMemoryRepository = () => {
  return new InMemoryRepository();
};

describe('ListMeasuresController', () => {
  it('should return 200 if valid data is provided', async () => {
    const { sut } = makeSut();

    const body = {
      customer_code: "1",
      measure_type: "GAS"
    }

    const body2 = {
      customer_code: "1",
    }

    const response = await sut.handle(body);
    const response2 = await sut.handle(body2);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("measures");
    expect(response.body.measures).toHaveLength(1);
    expect(response2.body.measures).toHaveLength(1);
    expect(response2.statusCode).toBe(200);
  });

  it('should return 400 if invalid measure_type is provided', async () => {
    const { sut } = makeSut();

    const body = {
      customer_code: "1",
      measure_type: "invalid_type"
    }

    const response = await sut.handle(body);

    expect(response.body).toHaveProperty('error_code', 'INVALID_TYPE');
    expect(response.statusCode).toBe(400);
  });

  it('should return 404 if measures were not found', async () => {
    const { sut } = makeSut();

    const body = {
      customer_code: "invalid_code",
    }

    const response = await sut.handle(body);

    expect(response.body).toHaveProperty('error_code', 'MEASURES_NOT_FOUND');
    expect(response.statusCode).toBe(404);
  });
});
