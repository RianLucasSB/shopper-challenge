"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_config_1 = require("../config/env-config");
const api_express_1 = require("../infra/api/express/api-express");
const confirm_measure_route_1 = require("../infra/api/express/routes/measure/confirm-measure-route");
const list_measures_route_1 = require("../infra/api/express/routes/measure/list-measures-route");
const read_measure_route_1 = require("../infra/api/express/routes/measure/read-measure-route");
const gemini_1 = require("../infra/generative-ai/gemini");
const prisma_measure_repository_1 = require("../infra/repositories/measure/prisma-measure-repository");
const prisma_1 = require("../lib/prisma");
const confirm_measure_controller_1 = require("../presentation/controllers/cofirm-measure/confirm-measure-controller");
const list_measures_controller_1 = require("../presentation/controllers/list-measures/list-measures-controller");
const read_measure_controller_1 = require("../presentation/controllers/read-measure/read-measure-controller");
function main() {
    const measureRepository = new prisma_measure_repository_1.MeasureRepositoryPrisma(prisma_1.prisma);
    const aiGenerative = new gemini_1.GeminiGenerativeAi();
    const readMeasureRoute = read_measure_route_1.ReadMeasureRoute.create(new read_measure_controller_1.ReadMeasureController(measureRepository, aiGenerative));
    const confirmMeasureRoute = confirm_measure_route_1.ConfirmMeasureRoute.create(new confirm_measure_controller_1.ConfirmMeasureController(measureRepository));
    const listMeasuresRoute = list_measures_route_1.ListMeasuresRoute.create(new list_measures_controller_1.ListMeasuresController(measureRepository));
    const api = api_express_1.ApiExpress.create([readMeasureRoute, confirmMeasureRoute, listMeasuresRoute]);
    const port = +env_config_1.envConfig.PORT;
    api.start(port);
}
main();
