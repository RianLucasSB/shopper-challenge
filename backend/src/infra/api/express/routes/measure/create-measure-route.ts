import { HttpMethod, Route } from '../route';
import { ReadMeasureController } from '../../../../../presentation/controllers/read-measure/read-measure-controller';
import { adaptRoute } from '../../../../../main/adapters/express-route-adapter';

export type ReadMeasureResponseDto = {
  id: string;
};

export class ReadMeasureRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly ReadMeasureController: ReadMeasureController,
  ) {}

  public static create(ReadMeasureController: ReadMeasureController) {
    return new ReadMeasureRoute('/measures', HttpMethod.POST, ReadMeasureController);
  }

  public getHandler() {
    return adaptRoute(this.ReadMeasureController);
  }

  public getPath(): string {
    return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }
}
