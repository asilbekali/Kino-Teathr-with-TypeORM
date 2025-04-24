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
const film_entity_1 = require("../entities/film.entity");
const fs = require("fs");
const path = require("path");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let FilmService = class FilmService {
    filimRepo;
    constructor(filimRepo) {
        this.filimRepo = filimRepo;
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
            const savedFilm = await this.filimRepo.save(newFilm);
            return savedFilm;
        }
        catch (error) {
            console.error("Error creating film:", error.message);
            throw new common_1.BadRequestException("Failed to create film");
        }
    }
    async findAll(query) {
        try {
            const { name, page = 1, limit = 10, sort = "asc" } = query;
            const whereQuery = name ? { name: (0, typeorm_2.Like)(`%${name}%`) } : {};
            const orderQuery = {
                name: sort.toUpperCase() === "asc" ? "ASC" : "DESC",
            };
            const [films, totalFilms] = await this.filimRepo.findAndCount({
                where: whereQuery,
                order: orderQuery,
                skip: (page - 1) * limit,
                take: limit,
            });
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
            const filmData = await this.filimRepo.findOne({ where: { id } });
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
            const film = await this.filimRepo.findOne({ where: { id } });
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
            await this.filimRepo.update(id, updatedData);
            const updatedFilm = await this.filimRepo.findOne({ where: { id } });
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
            const film = await this.filimRepo.findOne({ where: { id } });
            if (!film) {
                throw new common_1.NotFoundException("Film not found");
            }
            if (film.image) {
                const imagePath = path.resolve(film.image);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            const deleteResult = await this.filimRepo.delete(id);
            if (deleteResult.affected === 0) {
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
    __param(0, (0, typeorm_1.InjectRepository)(film_entity_1.film)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FilmService);
//# sourceMappingURL=film.service.js.map