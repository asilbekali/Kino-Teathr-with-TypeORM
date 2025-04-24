"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilmModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const film_service_1 = require("./film.service");
const film_controller_1 = require("./film.controller");
const film_entity_1 = require("../entities/film.entity");
let FilmModule = class FilmModule {
};
exports.FilmModule = FilmModule;
exports.FilmModule = FilmModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: film_entity_1.film.name, schema: film_entity_1.filmSchema }]),
        ],
        controllers: [film_controller_1.FilmController],
        providers: [film_service_1.FilmService],
    })
], FilmModule);
//# sourceMappingURL=film.module.js.map