"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiGenerativeAi = void 0;
const generative_ai_1 = require("@google/generative-ai");
const env_config_1 = require("../../config/env-config");
const convert_image_1 = require("../../utils/convert-image");
const measure_1 = require("../../domain/entities/measure");
const genAi = new generative_ai_1.GoogleGenerativeAI(env_config_1.envConfig.GEMINI_API_KEY);
const model = genAi.getGenerativeModel({
    model: 'gemini-1.5-flash',
});
class GeminiGenerativeAi {
    async extractValueFromImage(image, measureType) {
        const prompt = measureType === measure_1.MeasureType.GAS ?
            'essa e uma foto de um medidor de gas, me informe o valor contido nele, me retorne apenas o valor' :
            'essa e uma foto de um medidor de agua, me informe o valor contido nele, me retorne apenas o valor';
        const base64Image = image.split(',')[1];
        const part = {
            inlineData: {
                data: base64Image,
                mimeType: (0, convert_image_1.getMimeType)(base64Image),
            },
        };
        const generatedContent = await model.generateContent([prompt, part]);
        console.log(generatedContent.response.text());
        return +generatedContent.response.text();
    }
}
exports.GeminiGenerativeAi = GeminiGenerativeAi;
