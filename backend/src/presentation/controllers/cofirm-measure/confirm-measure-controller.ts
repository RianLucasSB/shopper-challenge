import { MeasureRepository } from "../../../domain/repositories/measure-repository";
import { InvalidParamError, MissingParamError } from "../../errors";
import { badRequest, conflictError, notFound } from "../../helpers/http-helper";
import { Controller, HttpResponse,  } from "../../protocols";
import { GenerativeAi } from "../../../data/protocols/generative-ai";
import { MeasureNotFoundError } from "../../errors/measure-not-found";

export interface ConfirmMeasureInputDto {
  measure_uuid?: string
  confirmed_value?: number
}

export interface ConfirmMeasureResponseDto {
  success: boolean 
}

export class ConfirmMeasureController implements Controller {
  constructor(
    private measureRepository: MeasureRepository,
  ){}

  async handle(req: ConfirmMeasureInputDto): Promise<HttpResponse> {
     const requiredFields = ['measure_uuid', 'confirmed_value']
     for (const field of requiredFields) {
      if (!req[field as keyof  ConfirmMeasureInputDto]) {
        return badRequest(new InvalidParamError(field))
      }
    }

    const measure = await this.measureRepository.findById(req.measure_uuid!)

    if(!measure){
      return notFound(new MeasureNotFoundError(), "MEASURE_NOT_FOUND")
    }

    const body: ConfirmMeasureResponseDto = {
      success: true
    }

    return {
      statusCode: 200,
      body
    }
  };

}