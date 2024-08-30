"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptRoute = void 0;
const adaptRoute = (controller) => {
    return async (req, res) => {
        const request = {
            ...(req.body || {}),
            ...(req.params || {}),
            ...(req.query || {}),
        };
        const httpResponse = await controller.handle(request);
        res.status(httpResponse.statusCode).json(httpResponse.body);
    };
};
exports.adaptRoute = adaptRoute;
