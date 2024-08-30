"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasureRepositoryPrisma = void 0;
const measure_1 = require("../../../domain/entities/measure");
class MeasureRepositoryPrisma {
    prismaClient;
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
    }
    async listByCustomerCodeAndMeasureType(code, measureType) {
        let measures = null;
        if (measureType) {
            measures = await this.prismaClient.measure.findMany({
                where: {
                    customerCode: code,
                    type: measureType,
                }
            });
        }
        else {
            measures = await this.prismaClient.measure.findMany({
                where: {
                    customerCode: code,
                }
            });
        }
        if (measures?.length > 0) {
            return measures.map(measure => {
                return new measure_1.Measure({
                    customerCode: measure.customerCode,
                    date: measure.date,
                    imageUrl: "",
                    isConfirmed: measure.isConfirmed,
                    type: measure.type,
                    uuid: measure.uuid,
                    value: measure.value
                });
            });
        }
        return null;
    }
    async findByDateAndType(date, measureType) {
        const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
        const endDate = this.getNextMonthDate(date);
        console.log(startDate.toISOString() + ", " + endDate.toISOString());
        const foundMeasure = await this.prismaClient.measure.findFirst({ where: {
                date: {
                    gte: startDate,
                    lt: endDate,
                },
                type: measureType
            } });
        if (!foundMeasure)
            return null;
        const { customerCode, date: foundDate, imageUrl, isConfirmed, type, uuid, value } = foundMeasure;
        return new measure_1.Measure({
            uuid,
            customerCode,
            date: foundDate,
            isConfirmed,
            type: type,
            imageUrl,
            value
        });
    }
    async findById(id) {
        const foundMeasure = await this.prismaClient.measure.findUnique({ where: { uuid: id } });
        if (!foundMeasure)
            return null;
        const { customerCode, date, imageUrl, isConfirmed, type, uuid, value } = foundMeasure;
        return new measure_1.Measure({
            uuid,
            customerCode,
            date,
            isConfirmed,
            type: type,
            imageUrl,
            value
        });
    }
    async save(measure) {
        const alreadyExists = await this.findByDateAndType(measure.date, measure.type);
        if (alreadyExists)
            return false;
        await this.prismaClient.measure.create({
            data: {
                customerCode: measure.customerCode,
                date: measure.date,
                imageUrl: "",
                isConfirmed: measure.isConfirmed,
                type: measure.type,
                uuid: measure.uuid,
                value: measure.value
            }
        });
        return true;
    }
    async confirm(id, value) {
        const measure = await this.findById(id);
        if (!measure)
            return false;
        await this.prismaClient.measure.update({
            where: { uuid: id },
            data: {
                isConfirmed: true,
                value
            }
        });
        return true;
    }
    getNextMonthDate(date) {
        const month = date.getMonth();
        if (month === 12) {
            return new Date(date.getFullYear(), 1, 1);
        }
        return new Date(date.getFullYear(), month + 1, 1);
    }
}
exports.MeasureRepositoryPrisma = MeasureRepositoryPrisma;
