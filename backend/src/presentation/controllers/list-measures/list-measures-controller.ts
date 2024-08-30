import { MeasureType } from "../../../domain/entities/measure";
import { MeasureRepository } from "../../../domain/repositories/measure-repository";
import { InvalidParamError } from "../../errors";
import { InvalidMeasureTypeError } from "../../errors/invalid-measure-type";
import { MeasureNotFoundError } from "../../errors/measure-not-found";
import { badRequest, notFound } from "../../helpers/http-helper";
import { Controller, HttpResponse,  } from "../../protocols";


export interface ListMeasuresInputDto {
  customer_code?: string
  measure_type?: string
}

export interface ListMeasuresResponseDto {
  customer_code: string
  measures: {
    measure_uuid: string,
    measure_datetime: string,
    measure_type: string,
    has_confirmed:boolean,
    image_url: string,
    measure_value: number,
  }[]
}

export class ListMeasuresController implements Controller {
  constructor(
    private measureRepository: MeasureRepository,
  ){}

  async handle(req: ListMeasuresInputDto): Promise<HttpResponse> {
     const requiredFields = ['customer_code']
     for (const field of requiredFields) {
      if (!req[field as keyof  ListMeasuresInputDto]) {
        return badRequest(new InvalidParamError(field))
      }
    }

    if(req.measure_type && !MeasureType[req.measure_type!.toUpperCase() as MeasureType]){
      return badRequest(new InvalidMeasureTypeError(), "INVALID_TYPE")
    }

    const measures = await this.measureRepository.listByCustomerCodeAndMeasureType(
      req.customer_code!,
      req?.measure_type?.toUpperCase() as MeasureType
    )

    if(!measures) {
      return notFound(new MeasureNotFoundError(), "MEASURES_NOT_FOUND")
    }

    const body: ListMeasuresResponseDto = {
      customer_code: req.customer_code!,
      measures: measures.map(measure => ({
        has_confirmed: measure.isConfirmed,
        image_url: "",
        measure_datetime: measure.date.toISOString(),
        measure_type: measure.type,
        measure_uuid: measure.uuid,
        measure_value: measure.value ?? 0,
      }))
    }

    return {
      statusCode: 200,
      body
    }
  };

}