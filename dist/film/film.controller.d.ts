import { FilmService } from './film.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
export declare class FilmController {
    private readonly filmService;
    constructor(filmService: FilmService);
    create(createFilmDto: CreateFilmDto, file: Express.Multer.File): Promise<import("mongoose").Document<unknown, {}, import("../entities/film.entity").film> & import("../entities/film.entity").film & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(name?: string, page?: string, limit?: string, sort?: 'asc' | 'desc'): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("../entities/film.entity").film> & import("../entities/film.entity").film & {
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
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("../entities/film.entity").film> & import("../entities/film.entity").film & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: string, updateFilmDto: UpdateFilmDto, file?: Express.Multer.File): Promise<import("mongoose").Document<unknown, {}, import("../entities/film.entity").film> & import("../entities/film.entity").film & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        message: string;
        film: import("mongoose").Document<unknown, {}, import("../entities/film.entity").film> & import("../entities/film.entity").film & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
}
