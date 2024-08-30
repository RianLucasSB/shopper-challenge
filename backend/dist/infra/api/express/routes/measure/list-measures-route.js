"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListMeasuresRoute = void 0;
const route_1 = require("../route");
const express_route_adapter_1 = require("../../../../../main/adapters/express-route-adapter");
class ListMeasuresRoute {
    path;
    method;
    ListMeasuresController;
    constructor(path, method, ListMeasuresController) {
        this.path = path;
        this.method = method;
        this.ListMeasuresController = ListMeasuresController;
    }
    static create(ListMeasuresController) {
        return new ListMeasuresRoute('/:customer_code/list', route_1.HttpMethod.GET, ListMeasuresController);
    }
    getHandler() {
        return (0, express_route_adapter_1.adaptRoute)(this.ListMeasuresController);
    }
    getPath() {
        return this.path;
    }
    getMethod() {
        return this.method;
    }
}
exports.ListMeasuresRoute = ListMeasuresRoute;
