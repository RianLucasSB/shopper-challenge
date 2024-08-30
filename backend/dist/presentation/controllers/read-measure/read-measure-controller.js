"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadMeasureController = void 0;
const crypto_1 = require("crypto");
const measure_1 = require("../../../domain/entities/measure");
const errors_1 = require("../../errors");
const http_helper_1 = require("../../helpers/http-helper");
const base64_validator_1 = require("../../../validation/base64-validator");
class ReadMeasureController {
    measureRepository;
    generativeAi;
    constructor(measureRepository, generativeAi) {
        this.measureRepository = measureRepository;
        this.generativeAi = generativeAi;
    }
    async handle(req) {
        const requiredFields = ['image', 'customer_code', 'measure_datetime', 'measure_type'];
        for (const field of requiredFields) {
            if (!req[field]) {
                return (0, http_helper_1.badRequest)(new errors_1.InvalidParamError(field));
            }
        }
        if (!measure_1.MeasureType[req.measure_type.toUpperCase()]) {
            return (0, http_helper_1.badRequest)(new errors_1.InvalidParamError('measure_type'));
        }
        if (!(0, base64_validator_1.isValidBase64)(req.image)) {
            return (0, http_helper_1.badRequest)(new errors_1.InvalidParamError('image'));
        }
        const generativeAiResponse = await this.
            generativeAi.
            extractValueFromImage(req.image, req.measure_type);
        const measure = new measure_1.Measure({
            customerCode: req.customer_code,
            date: new Date(req.measure_datetime),
            type: req.measure_type.toUpperCase(),
            uuid: (0, crypto_1.randomUUID)().toString(),
            isConfirmed: false,
            imageUrl: "",
            value: generativeAiResponse
        });
        const isValid = await this.measureRepository.save(measure);
        if (!isValid) {
            return (0, http_helper_1.conflictError)(new Error("Leitura do mês já realizada"), 'DOUBLE_REPORT');
        }
        const body = {
            image_url: "",
            measure_uuid: measure.uuid,
            measure_value: generativeAiResponse
        };
        return {
            statusCode: 200,
            body
        };
    }
    ;
}
exports.ReadMeasureController = ReadMeasureController;
