import { envConfig } from '../config/env-config';
import { ApiExpress } from '../infra/api/express/api-express';
import { ReadMeasureRoute } from '../infra/api/express/routes/measure/create-measure-route';
import { GeminiGenerativeAi } from '../infra/generative-ai/gemini';
import { MeasureRepositoryPrisma } from '../infra/repositories/measure/prisma-measure-repository';
import { ReadMeasureController } from '../presentation/controllers/read-measure/read-measure-controller';

function main() {
  const measureRepository = new MeasureRepositoryPrisma();
  const aiGenerative = new GeminiGenerativeAi();

  const createRoute = ReadMeasureRoute.create(new ReadMeasureController(measureRepository, aiGenerative));

  const api = ApiExpress.create([createRoute]);
  const port = +envConfig.PORT;
  api.start(port);
}

main();
