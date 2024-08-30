"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const measure_in_memory_repository_1 = require("../../../tests/repositories/measure-in-memory-repository");
const confirm_measure_controller_1 = require("./confirm-measure-controller");
const makeSut = () => {
    const sut = new confirm_measure_controller_1.ConfirmMeasureController(makeInMemoryRepository());
    return {
        sut,
    };
};
const existingUUID = '123e4567-e89b-12d3-a456-426614174000';
const makeInMemoryRepository = () => {
    return new measure_in_memory_repository_1.InMemoryRepository();
};
describe('ConfirmMeasureController', () => {
    it('should return 200 if valid data is provided', async () => {
        const { sut } = makeSut();
        const body = {
            confirmed_value: 221,
            measure_uuid: existingUUID
        };
        const response = await sut.handle(body);
        expect(response.body).toHaveProperty('success', true);
        expect(response.statusCode).toBe(200);
    });
    it('should return 404 if not exists measure for provided measure_uuid', async () => {
        const { sut } = makeSut();
        const body = {
            confirmed_value: 221,
            measure_uuid: crypto_1.randomUUID.toString()
        };
        const response = await sut.handle(body);
        expect(response.body).toHaveProperty('error_code', 'MEASURE_NOT_FOUND');
        expect(response.statusCode).toBe(404);
    });
    it('should return 409 if measure is already confirmed', async () => {
        const { sut } = makeSut();
        const body = {
            confirmed_value: 221,
            measure_uuid: existingUUID
        };
        await sut.handle(body);
        const response = await sut.handle(body);
        expect(response.body).toHaveProperty('error_code', 'CONFIRMATION_DUPLICATE');
        expect(response.statusCode).toBe(409);
    });
    it('should return 400 if missing measure_uuid param', async () => {
        const { sut } = makeSut();
        const body = {
            confirmed_value: 221
        };
        const response = await sut.handle(body);
        expect(response.body).toHaveProperty('error_code', 'INVALID_DATA');
    });
    it('should return 400 if missing confirmed_value param', async () => {
        const { sut } = makeSut();
        const body = {
            measure_uuid: existingUUID,
        };
        const response = await sut.handle(body);
        expect(response.body).toHaveProperty('error_code', 'INVALID_DATA');
    });
});
