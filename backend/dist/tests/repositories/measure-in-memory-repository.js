"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryRepository = void 0;
const measure_1 = require("../../domain/entities/measure");
class InMemoryRepository {
    data = [new measure_1.Measure({
            uuid: '123e4567-e89b-12d3-a456-426614174000',
            date: new Date('2024-12-05T14:48:00.000Z'),
            type: measure_1.MeasureType.GAS,
            customerCode: "1",
            isConfirmed: false,
            imageUrl: "",
            value: 0
        })];
    async findByDateAndType(date, measureType) {
        const measure = this.data.find(m => m.date.getMonth() === date.getMonth() && measureType === m.type);
        if (!measure)
            return null;
        return measure;
    }
    async findById(id) {
        const measure = this.data.find(m => m.uuid === id);
        if (!measure)
            return null;
        return measure;
    }
    async save(measure) {
        const alreadyExists = await this.findByDateAndType(measure.date, measure.type);
        if (alreadyExists) {
            return false;
        }
        this.data.push(measure);
        return true;
    }
    async confirm(id, value) {
        const measure = await this.findById(id);
        if (!measure)
            return false;
        measure.isConfirmed = true;
        measure.value = value;
        return true;
    }
    async listByCustomerCodeAndMeasureType(code, measureType) {
        const measures = this.data.filter(m => {
            if (measureType) {
                return m.customerCode === code && m.type === measureType;
            }
            return m.customerCode === code;
        });
        if (measures.length <= 0) {
            return null;
        }
        return measures;
    }
}
exports.InMemoryRepository = InMemoryRepository;
