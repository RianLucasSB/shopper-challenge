import { MeasureType } from "../../../domain/entities/measure";
import { InvalidParamError, MissingParamError } from "../../errors";
import { badRequest } from "../../helpers/http-helper";
import { Controller, HttpError, HttpRequest, HttpResponse,  } from "../../protocols";
import {Request, Response} from 'express'

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

    const body: CreateMeasureResponseDto = {
      image_url: "",
      measure_uuid: "",
      measure_value: 0
    }

    return {
      statusCode: 200,
      body
    }
  };

}