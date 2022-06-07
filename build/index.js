"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const participant_router_1 = __importDefault(require("./routes/participant-router"));
const app = (0, express_1.default)();
const port = 8000;
app.use('/participants', participant_router_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to node.js world!!');
});
var mongoDB = 'mongodb://127.0.0.1:27017/eurodb';
mongoose_1.default.connect(mongoDB).then(() => __awaiter(void 0, void 0, void 0, function* () {
    const db = mongoose_1.default.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    app.listen(port, () => {
        console.log(`The application is listening on port: ${port}`);
    });
}));
