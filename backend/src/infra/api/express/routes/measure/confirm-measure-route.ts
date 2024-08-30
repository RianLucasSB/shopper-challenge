import { HttpMethod, Route } from '../route';
import { adaptRoute } from '../../../../../main/adapters/express-route-adapter';
import { ConfirmMeasureController } from '../../../../../presentation/controllers/cofirm-measure/confirm-measure-controller';

export class ConfirmMeasureRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly ConfirmMeasureController: ConfirmMeasureController,
  ) {}

  public static create(ConfirmMeasureController: ConfirmMeasureController) {
    return new ConfirmMeasureRoute('/confirm', HttpMethod.PATCH, ConfirmMeasureController);
  }

  public getHandler() {
    return adaptRoute(this.ConfirmMeasureController);
  }

  public getPath(): string {
    return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }
}
