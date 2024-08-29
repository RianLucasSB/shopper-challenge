import { envConfig } from '../config/env-config';
import { ApiExpress } from '../infra/api/express/api-express';
import { CreateMeasureRoute } from '../infra/api/express/routes/measure/create-measure-route';
import { GeminiGenerativeAi } from '../infra/generative-ai/gemini';
import { MeasureRepositoryPrisma } from '../infra/repositories/measure/prisma-measure-repository';
import { CreateMeasureController } from '../presentation/controllers/create-measure/create-measure-controller';

function main() {
  const measureRepository = new MeasureRepositoryPrisma();
  const aiGenerative = new GeminiGenerativeAi();

  const createRoute = CreateMeasureRoute.create(new CreateMeasureController(measureRepository, aiGenerative));

  const api = ApiExpress.create([createRoute]);
  const port = +envConfig.PORT;
  api.start(port);
}

main();
