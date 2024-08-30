"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadMeasureRoute = void 0;
const route_1 = require("../route");
const express_route_adapter_1 = require("../../../../../main/adapters/express-route-adapter");
class ReadMeasureRoute {
    path;
    method;
    ReadMeasureController;
    constructor(path, method, ReadMeasureController) {
        this.path = path;
        this.method = method;
        this.ReadMeasureController = ReadMeasureController;
    }
    static create(ReadMeasureController) {
        return new ReadMeasureRoute('/upload', route_1.HttpMethod.POST, ReadMeasureController);
    }
    getHandler() {
        return (0, express_route_adapter_1.adaptRoute)(this.ReadMeasureController);
    }
    getPath() {
        return this.path;
    }
    getMethod() {
        return this.method;
    }
}
exports.ReadMeasureRoute = ReadMeasureRoute;
