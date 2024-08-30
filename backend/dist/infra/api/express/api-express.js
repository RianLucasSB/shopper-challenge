"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiExpress = void 0;
const express_1 = __importDefault(require("express"));
class ApiExpress {
    app;
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.json({ limit: '50mb' }));
        this.addRoutes(routes);
    }
    static create(routes) {
        return new ApiExpress(routes);
    }
    addRoutes(routes) {
        routes.forEach((route) => {
            const path = route.getPath();
            const method = route.getMethod();
            const handler = route.getHandler();
            this.app[method](path, handler);
        });
    }
    start(port) {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
            this.listRoutes();
        });
    }
    listRoutes() {
        const routes = this.app._router.stack
            .filter((route) => route.route)
            .map((route) => {
            return {
                path: route.route.path,
                method: route.route.stack[0].method,
            };
        });
        console.log(routes);
    }
}
exports.ApiExpress = ApiExpress;
