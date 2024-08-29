import { randomUUID } from "crypto";
import { Measure, MeasureType } from "../../../domain/entities/measure";
import { MeasureRepository } from "../../../domain/repositories/measure-repository";
import { InvalidParamError, MissingParamError } from "../../errors";
import { badRequest, conflictError } from "../../helpers/http-helper";
import { Controller, HttpResponse,  } from "../../protocols";
import { GenerativeAi } from "../../../data/protocols/generative-ai";

export interface CreateMeasureInputDto {
  customer_code?: string
  image?: string 
  measure_datetime?: string
  measure_type?: string
}

export interface CreateMeasureResponseDto {
  image_url: string 
  measure_value: number
  measure_uuid: string
}

export class CreateMeasureController implements Controller {
  constructor(
    private measureRepository: MeasureRepository,
    private generativeAi: GenerativeAi
  ){}

  async handle(req: CreateMeasureInputDto): Promise<HttpResponse> {
     const requiredFields = ['image', 'customer_code', 'measure_datetime', 'measure_type']
     for (const field of requiredFields) {
      if (!req[field as keyof  CreateMeasureInputDto]) {
        return badRequest(new InvalidParamError(field))
      }
    }

    if(!MeasureType[req.measure_type!.toUpperCase() as MeasureType]){
      return badRequest(new InvalidParamError('measure_type'))
    }

    const measure = new Measure({
      customerCode: req.customer_code!, 
      date: new Date(req.measure_datetime!),
      type: req.measure_type as MeasureType,
      uuid: randomUUID().toString()      
    })


    const isValid = await this.measureRepository.save(measure)

    if(!isValid){
      return conflictError(new Error("Leitura do mês já realizada"))
    }

    const generativeAiResponse = await this.
      generativeAi.
      extractValueFromImage(req.image!, measure.type)

    const body: CreateMeasureResponseDto = {
      image_url: "",
      measure_uuid: "",
      measure_value: generativeAiResponse
    }

    return {
      statusCode: 200,
      body
    }
  };

}