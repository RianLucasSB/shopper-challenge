"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListMeasuresController = void 0;
const measure_1 = require("../../../domain/entities/measure");
const errors_1 = require("../../errors");
const invalid_measure_type_1 = require("../../errors/invalid-measure-type");
const measure_not_found_1 = require("../../errors/measure-not-found");
const http_helper_1 = require("../../helpers/http-helper");
class ListMeasuresController {
    measureRepository;
    constructor(measureRepository) {
        this.measureRepository = measureRepository;
    }
    async handle(req) {
        const requiredFields = ['customer_code'];
        for (const field of requiredFields) {
            if (!req[field]) {
                return (0, http_helper_1.badRequest)(new errors_1.InvalidParamError(field));
            }
        }
        if (req.measure_type && !measure_1.MeasureType[req.measure_type.toUpperCase()]) {
            return (0, http_helper_1.badRequest)(new invalid_measure_type_1.InvalidMeasureTypeError(), "INVALID_TYPE");
        }
        const measures = await this.measureRepository.listByCustomerCodeAndMeasureType(req.customer_code, req?.measure_type?.toUpperCase());
        if (!measures) {
            return (0, http_helper_1.notFound)(new measure_not_found_1.MeasureNotFoundError(), "MEASURES_NOT_FOUND");
        }
        const body = {
            customer_code: req.customer_code,
            measures: measures.map(measure => ({
                has_confirmed: measure.isConfirmed,
                image_url: "",
                measure_datetime: measure.date.toISOString(),
                measure_type: measure.type,
                measure_uuid: measure.uuid,
                measure_value: measure.value ?? 0,
            }))
        };
        return {
            statusCode: 200,
            body
        };
    }
    ;
}
exports.ListMeasuresController = ListMeasuresController;
