import { HttpMethod, Route } from '../route';
import { adaptRoute } from '../../../../../main/adapters/express-route-adapter';
import { ListMeasuresController } from '../../../../../presentation/controllers/list-measures/list-measures-controller';

export class ListMeasuresRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly ListMeasuresController: ListMeasuresController,
  ) {}

  public static create(ListMeasuresController: ListMeasuresController) {
    return new ListMeasuresRoute('/:customer_code/list', HttpMethod.GET, ListMeasuresController);
  }

  public getHandler() {
    return adaptRoute(this.ListMeasuresController);
  }

  public getPath(): string {
    return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }
}
