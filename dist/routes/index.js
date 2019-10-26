"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const api = __importStar(require("./api"));
exports.registerRoutes = (app) => {
    // define a route handler for the default home page
    app.get("/", (req, res) => {
        res.render("index");
    });
    api.registerRoutes(app);
};
//# sourceMappingURL=index.js.map