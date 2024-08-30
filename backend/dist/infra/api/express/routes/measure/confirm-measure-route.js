"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmMeasureRoute = void 0;
const route_1 = require("../route");
const express_route_adapter_1 = require("../../../../../main/adapters/express-route-adapter");
class ConfirmMeasureRoute {
    path;
    method;
    ConfirmMeasureController;
    constructor(path, method, ConfirmMeasureController) {
        this.path = path;
        this.method = method;
        this.ConfirmMeasureController = ConfirmMeasureController;
    }
    static create(ConfirmMeasureController) {
        return new ConfirmMeasureRoute('/confirm', route_1.HttpMethod.PATCH, ConfirmMeasureController);
    }
    getHandler() {
        return (0, express_route_adapter_1.adaptRoute)(this.ConfirmMeasureController);
    }
    getPath() {
        return this.path;
    }
    getMethod() {
        return this.method;
    }
}
exports.ConfirmMeasureRoute = ConfirmMeasureRoute;
