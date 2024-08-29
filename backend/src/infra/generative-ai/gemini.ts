import { GenerativeAi } from '../../data/protocols/generative-ai';
import { GoogleGenerativeAI, Part } from '@google/generative-ai';
import { envConfig } from '../../config/env-config';
import { getMimeType } from '../../utils/convert-image';
import { MeasureType } from '../../domain/entities/measure';

const genAi = new GoogleGenerativeAI(envConfig.GEMINI_API_KEY);
const model = genAi.getGenerativeModel({
  model: 'gemini-1.5-flash',
});
export class GeminiGenerativeAi implements GenerativeAi {
  async extractValueFromImage(image: string, measureType: string): Promise<number> {
    const prompt = measureType === MeasureType.GAS ? 
    'essa e uma foto de um medidor de gas, me informe o valor contido nele, me retorne apenas o valor' : 
    'essa e uma foto de um medidor de agua, me informe o valor contido nele, me retorne apenas o valor'
    ;
    const base64Image = image.split(',')[1];
    const part: Part = {
      inlineData: {
        data: base64Image,
        mimeType: getMimeType(base64Image) as string,
      },
    };

    const generatedContent = await model.generateContent([prompt, part]);

    console.log(generatedContent.response.text());
    return +generatedContent.response.text();
  }
}
