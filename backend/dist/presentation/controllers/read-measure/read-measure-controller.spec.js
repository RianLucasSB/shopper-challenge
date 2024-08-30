"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const read_measure_controller_1 = require("./read-measure-controller");
const measure_in_memory_repository_1 = require("../../../tests/repositories/measure-in-memory-repository");
const validImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII';
const makeSut = () => {
    const generativeAiStub = makeGenerativeAi();
    const sut = new read_measure_controller_1.ReadMeasureController(makeInMemoryRepository(), generativeAiStub);
    return {
        sut,
        generativeAi: generativeAiStub,
    };
};
const makeGenerativeAi = () => {
    class GenerativeAiStub {
        async extractValueFromImage(image, measureType) {
            return 0;
        }
    }
    return new GenerativeAiStub();
};
const makeInMemoryRepository = () => {
    return new measure_in_memory_repository_1.InMemoryRepository();
};
describe('ReadMeasureController', () => {
    it('should call generative ai with correct values', async () => {
        const { sut, generativeAi } = makeSut();
        const extractValueFromImageSpy = jest.spyOn(generativeAi, 'extractValueFromImage');
        const body = {
            image: validImage,
            customer_code: (0, crypto_1.randomUUID)().toString(),
            measure_datetime: '2011-10-05T14:48:00.000Z',
            measure_type: 'GAS',
        };
        await sut.handle(body);
        expect(extractValueFromImageSpy).toHaveBeenCalledWith(body.image, body.measure_type);
    });
    it('should return 200 if valid data is provided', async () => {
        const { sut } = makeSut();
        const body = {
            image: validImage,
            customer_code: (0, crypto_1.randomUUID)().toString(),
            measure_datetime: '2011-10-05T14:48:00.000Z',
            measure_type: 'GAS',
        };
        const body2 = {
            image: validImage,
            customer_code: (0, crypto_1.randomUUID)().toString(),
            measure_datetime: '2011-10-05T14:48:00.000Z',
            measure_type: 'WATER',
        };
        await sut.handle(body);
        const response = await sut.handle(body2);
        expect(response.statusCode).toBe(200);
    });
    it('should return 409 if already exists a measure of provided measure type for the month provided', async () => {
        const { sut } = makeSut();
        const body = {
            image: validImage,
            customer_code: (0, crypto_1.randomUUID)().toString(),
            measure_datetime: '2024-12-05T14:48:00.000Z',
            measure_type: 'GAS',
        };
        const response = await sut.handle(body);
        expect(response.statusCode).toBe(409);
        expect(response.body).toHaveProperty('error_code', 'DOUBLE_REPORT');
    });
    it('should return 400 if image format is invalid', async () => {
        const { sut } = makeSut();
        const body = {
            image: 'invalid_image',
            customer_code: (0, crypto_1.randomUUID)().toString(),
            measure_datetime: '2011-10-05T14:48:00.000Z',
            measure_type: 'WATER',
        };
        const response = await sut.handle(body);
        expect(response.body).toHaveProperty('error_code', 'INVALID_DATA');
    });
    it('should return 400 if invalid measure type is provided', async () => {
        const { sut } = makeSut();
        const body = {
            image: validImage,
            customer_code: (0, crypto_1.randomUUID)().toString(),
            measure_datetime: '2011-10-05T14:48:00.000Z',
            measure_type: 'invalid_measure',
        };
        const response = await sut.handle(body);
        expect(response.body).toHaveProperty('error_code', 'INVALID_DATA');
    });
    it('should return 400 if invalid measure type is provided', async () => {
        const { sut } = makeSut();
        const body = {
            image: validImage,
            customer_code: (0, crypto_1.randomUUID)().toString(),
            measure_datetime: '2011-10-05T14:48:00.000Z',
            measure_type: 'invalid_measure',
        };
        const response = await sut.handle(body);
        expect(response.body).toHaveProperty('error_code', 'INVALID_DATA');
    });
    it('should return 400 if missing image param', async () => {
        const { sut } = makeSut();
        const body = {
            customer_code: (0, crypto_1.randomUUID)().toString(),
            measure_datetime: '2011-10-05T14:48:00.000Z',
            measure_type: 'GAS',
        };
        const response = await sut.handle(body);
        expect(response.body).toHaveProperty('error_code', 'INVALID_DATA');
    });
    it('should return 400 if missing customer_code param', async () => {
        const { sut } = makeSut();
        const body = {
            image: validImage,
            measure_datetime: '2011-10-05T14:48:00.000Z',
            measure_type: 'GAS',
        };
        const response = await sut.handle(body);
        expect(response.body).toHaveProperty('error_code', 'INVALID_DATA');
    });
    it('should return 400 if missing measure_datetime param', async () => {
        const { sut } = makeSut();
        const body = {
            customer_code: (0, crypto_1.randomUUID)().toString(),
            image: validImage,
            measure_type: 'GAS',
        };
        const response = await sut.handle(body);
        expect(response.body).toHaveProperty('error_code', 'INVALID_DATA');
    });
    it('should return 400 if missing measure_type param', async () => {
        const { sut } = makeSut();
        const body = {
            customer_code: (0, crypto_1.randomUUID)().toString(),
            measure_datetime: '2011-10-05T14:48:00.000Z',
            image: validImage,
        };
        const response = await sut.handle(body);
        expect(response.body).toHaveProperty('error_code', 'INVALID_DATA');
    });
});
