import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { CreateFilmDto } from "./dto/create-film.dto";
import { UpdateFilmDto } from "./dto/update-film.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { film } from "../entities/film.entity";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class FilmService {
    constructor(
        @InjectModel(film.name) private readonly filmModel: Model<film>
    ) {}

    async create(createFilmDto: CreateFilmDto, file: Express.Multer.File) {
        try {
            if (!file) {
                throw new BadRequestException("File is required");
            }

            // Save the file path in the database
            const imagePath = `uploads/${file.filename}`;
            const newFilm = {
                ...createFilmDto,
                image: imagePath,
            };

            return await this.filmModel.create(newFilm);
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

            const filterQuery = name
                ? { name: { $regex: name, $options: "i" } }
                : {};
            const sortQuery: { [key: string]: 1 | -1 } = {
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
        } catch (error) {
            console.error("Error in findAll:", error.message);
            throw new BadRequestException("Failed to fetch films");
        }
    }

    async findOne(id: string) {
        try {
            const filmData = await this.filmModel.findById(id);
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
        id: string,
        updateFilmDto: UpdateFilmDto,
        file?: Express.Multer.File
    ) {
        try {
            const film = await this.filmModel.findById(id);
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

            const updatedFilm = await this.filmModel
                .findByIdAndUpdate(id, { $set: updatedData }, { new: true })
                .exec();

            if (!updatedFilm) {
                throw new Error("Failed to update film");
            }

            return updatedFilm;
        } catch (error) {
            console.error("Error updating film:", error.message);
            throw new BadRequestException("Failed to update film");
        }
    }

    async remove(id: string) {
        try {
            const film = await this.filmModel.findById(id);
            if (!film) {
                throw new NotFoundException("Film not found");
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
        } catch (error) {
            console.error("Error removing film:", error.message);
            throw new BadRequestException("Failed to delete film");
        }
    }
}
