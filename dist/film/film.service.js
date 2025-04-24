"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilmService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const film_entity_1 = require("../entities/film.entity");
const fs = require("fs");
const path = require("path");
let FilmService = class FilmService {
    filmModel;
    constructor(filmModel) {
        this.filmModel = filmModel;
    }
    async create(createFilmDto, file) {
        try {
            if (!file) {
                throw new common_1.BadRequestException("File is required");
            }
            const imagePath = `uploads/${file.filename}`;
            const newFilm = {
                ...createFilmDto,
                image: imagePath,
            };
            return await this.filmModel.create(newFilm);
        }
        catch (error) {
            console.error("Error creating film:", error.message);
            throw new common_1.BadRequestException("Failed to create film");
        }
    }
    async findAll(query) {
        try {
            const { name, page = 1, limit = 10, sort = "asc" } = query;
            const filterQuery = name
                ? { name: { $regex: name, $options: "i" } }
                : {};
            const sortQuery = {
                name: sort === "asc" ? 1 : -1,
            };
            const skip = (page - 1) * limit;
            const films = await this.filmModel
                .find(filterQuery)
                .sort(sortQuery)
                .skip(skip)
                .limit(limit);
            const totalFilms = await this.filmModel.countDocuments(filterQuery);
            return {
                data: films,
                pagination: {
                    total: totalFilms,
                    currentPage: page,
                    totalPages: Math.ceil(totalFilms / limit),
                },
            };
        }
        catch (error) {
            console.error("Error in findAll:", error.message);
            throw new common_1.BadRequestException("Failed to fetch films");
        }
    }
    async findOne(id) {
        try {
            const filmData = await this.filmModel.findById(id);
            if (!filmData) {
                throw new common_1.NotFoundException("Film not found");
            }
            return filmData;
        }
        catch (error) {
            console.error("Error in findOne:", error.message);
            throw new common_1.BadRequestException("Failed to fetch film");
        }
    }
    async update(id, updateFilmDto, file) {
        try {
            const film = await this.filmModel.findById(id);
            if (!film) {
                throw new common_1.NotFoundException("Film not found");
            }
            const updatedData = { ...updateFilmDto };
            if (file) {
                const imagePath = `uploads/${file.filename}`;
                updatedData["image"] = imagePath;
                if (film.image) {
                    const oldPath = path.resolve(film.image);
                    if (fs.existsSync(oldPath)) {
                        fs.unlinkSync(oldPath);
                    }
                }
            }
            const updatedFilm = await this.filmModel
                .findByIdAndUpdate(id, { $set: updatedData }, { new: true })
                .exec();
            if (!updatedFilm) {
                throw new Error("Failed to update film");
            }
            return updatedFilm;
        }
        catch (error) {
            console.error("Error updating film:", error.message);
            throw new common_1.BadRequestException("Failed to update film");
        }
    }
    async remove(id) {
        try {
            const film = await this.filmModel.findById(id);
            if (!film) {
                throw new common_1.NotFoundException("Film not found");
            }
            if (film.image) {
                const imagePath = path.resolve(film.image);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            const deleteResult = await this.filmModel.deleteOne({ _id: id });
            if (deleteResult.deletedCount === 0) {
                throw new Error("Failed to delete film");
            }
            return { message: "Film successfully deleted", film };
        }
        catch (error) {
            console.error("Error removing film:", error.message);
            throw new common_1.BadRequestException("Failed to delete film");
        }
    }
};
exports.FilmService = FilmService;
exports.FilmService = FilmService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(film_entity_1.film.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FilmService);
//# sourceMappingURL=film.service.js.map