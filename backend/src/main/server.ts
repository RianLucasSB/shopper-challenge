import { envConfig } from '../config/env-config';
import { ApiExpress } from '../infra/api/express/api-express';
import { ConfirmMeasureRoute } from '../infra/api/express/routes/measure/confirm-measure-route';
import { ListMeasuresRoute } from '../infra/api/express/routes/measure/list-measures-route';
import { ReadMeasureRoute } from '../infra/api/express/routes/measure/read-measure-route';
import { GeminiGenerativeAi } from '../infra/generative-ai/gemini';
import { MeasureRepositoryPrisma } from '../infra/repositories/measure/prisma-measure-repository';
import { prisma } from '../lib/prisma';
import { ConfirmMeasureController } from '../presentation/controllers/cofirm-measure/confirm-measure-controller';
import { ListMeasuresController } from '../presentation/controllers/list-measures/list-measures-controller';
import { ReadMeasureController } from '../presentation/controllers/read-measure/read-measure-controller';

function main() {
  const measureRepository = new MeasureRepositoryPrisma(prisma);
  const aiGenerative = new GeminiGenerativeAi();

  const readMeasureRoute = ReadMeasureRoute.create(new ReadMeasureController(measureRepository, aiGenerative));
  const confirmMeasureRoute = ConfirmMeasureRoute.create(new ConfirmMeasureController(measureRepository));
  const listMeasuresRoute = ListMeasuresRoute.create(new ListMeasuresController(measureRepository));

  const api = ApiExpress.create([readMeasureRoute, confirmMeasureRoute, listMeasuresRoute]);
  const port = +envConfig.PORT;
  api.start(port);
}

main();
