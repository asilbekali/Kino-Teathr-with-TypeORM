import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { CreateFilmDto } from "./dto/create-film.dto";
import { UpdateFilmDto } from "./dto/update-film.dto";
import { film } from "../entities/film.entity";
import * as fs from "fs";
import * as path from "path";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";

@Injectable()
export class FilmService {
    constructor(@InjectRepository(film) private filimRepo: Repository<film>) {}

    async create(createFilmDto: CreateFilmDto, file: Express.Multer.File) {
        try {
            if (!file) {
                throw new BadRequestException("File is required");
            }

            const imagePath = `uploads/${file.filename}`;
            const newFilm = {
                ...createFilmDto,
                image: imagePath,
            };

            const savedFilm = await this.filimRepo.save(newFilm);

            return savedFilm;
        } catch (error) {
            console.error("Error creating film:", error.message);
            throw new BadRequestException("Failed to create film");
        }
    }

    async findAll(query: {
        name?: string;
        page?: number;
        limit?: number;
        sort?: "asc" | "desc";
    }) {
        try {
            const { name, page = 1, limit = 10, sort = "asc" } = query;

            const whereQuery = name ? { name: Like(`%${name}%`) } : {};

            const orderQuery: { [key: string]: "ASC" | "DESC" } = {
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
        } catch (error) {
            console.error("Error in findAll:", error.message);
            throw new BadRequestException("Failed to fetch films");
        }
    }

    async findOne(id: number) {
        try {
            const filmData = await this.filimRepo.findOne({ where: { id } });
            if (!filmData) {
                throw new NotFoundException("Film not found");
            }
            return filmData;
        } catch (error) {
            console.error("Error in findOne:", error.message);
            throw new BadRequestException("Failed to fetch film");
        }
    }

    async update(
        id: number,
        updateFilmDto: UpdateFilmDto,
        file?: Express.Multer.File
    ) {
        try {
            const film = await this.filimRepo.findOne({ where: { id } });
            if (!film) {
                throw new NotFoundException("Film not found");
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
        } catch (error) {
            console.error("Error updating film:", error.message);
            throw new BadRequestException("Failed to update film");
        }
    }

    async remove(id: number) {
        try {
            const film = await this.filimRepo.findOne({ where: { id } });
            if (!film) {
                throw new NotFoundException("Film not found");
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
        } catch (error) {
            console.error("Error removing film:", error.message);
            throw new BadRequestException("Failed to delete film");
        }
    }
}
