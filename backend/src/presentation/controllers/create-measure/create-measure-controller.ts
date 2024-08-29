import { randomUUID } from "crypto";
import { Measure, MeasureType } from "../../../domain/entities/measure";
import { MeasureRepository } from "../../../domain/repositories/measure-repository";
import { InvalidParamError, MissingParamError } from "../../errors";
import { badRequest, conflictError } from "../../helpers/http-helper";
import { Controller, HttpResponse,  } from "../../protocols";
import { GenerativeAi } from "../../../data/protocols/generative-ai";
import { isValidBase64 } from "../../../validation/base64-validator";

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

    if(!isValidBase64(req.image!)){
      return badRequest(new InvalidParamError('image'))
    }

    const measure = new Measure({
      customerCode: req.customer_code!, 
      date: new Date(req.measure_datetime!),
      type: req.measure_type as MeasureType,
      uuid: randomUUID().toString()      
    })


    const measureExists = await this.measureRepository.findByMonthAndType(measure.date.getMonth(), measure.type)

    if(measureExists){
      return conflictError(new Error("Leitura do mês já realizada"))
    }

    const generativeAiResponse = await this.
      generativeAi.
      extractValueFromImage(req.image!, measure.type)

    const body: CreateMeasureResponseDto = {
      image_url: "",
      measure_uuid: measure.uuid,
      measure_value: generativeAiResponse
    }

    return {
      statusCode: 200,
      body
    }
  };

}