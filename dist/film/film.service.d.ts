import { CreateFilmDto } from "./dto/create-film.dto";
import { UpdateFilmDto } from "./dto/update-film.dto";
import { Model } from "mongoose";
import { film } from "../entities/film.entity";
export declare class FilmService {
    private readonly filmModel;
    constructor(filmModel: Model<film>);
    create(createFilmDto: CreateFilmDto, file: Express.Multer.File): Promise<import("mongoose").Document<unknown, {}, film> & film & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(query: {
        name?: string;
        page?: number;
        limit?: number;
        sort?: "asc" | "desc";
    }): Promise<{
        data: (import("mongoose").Document<unknown, {}, film> & film & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        pagination: {
            total: number;
            currentPage: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, film> & film & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: string, updateFilmDto: UpdateFilmDto, file?: Express.Multer.File): Promise<import("mongoose").Document<unknown, {}, film> & film & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        message: string;
        film: import("mongoose").Document<unknown, {}, film> & film & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
}
