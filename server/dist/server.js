"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3100;
app_1.default.listen(port, () => {
    console.log("server running on port: " + port);
});
//# sourceMappingURL=server.js.map