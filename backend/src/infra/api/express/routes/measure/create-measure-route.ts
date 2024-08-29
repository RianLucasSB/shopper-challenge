import { HttpMethod, Route } from '../route';
import { CreateMeasureController } from '../../../../../presentation/controllers/create-measure/create-measure-controller';
import { adaptRoute } from '../../../../../main/adapters/express-route-adapter';

export type CreateMeasureResponseDto = {
  id: string;
};

export class CreateMeasureRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createMeasureController: CreateMeasureController,
  ) {}

  public static create(createMeasureController: CreateMeasureController) {
    return new CreateMeasureRoute('/measures', HttpMethod.POST, createMeasureController);
  }

  public getHandler() {
    return adaptRoute(this.createMeasureController);
  }

  public getPath(): string {
    return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }
}
