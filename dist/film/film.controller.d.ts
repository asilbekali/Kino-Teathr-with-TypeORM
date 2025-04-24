import { FilmService } from './film.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
export declare class FilmController {
    private readonly filmService;
    constructor(filmService: FilmService);
    create(createFilmDto: CreateFilmDto, file: Express.Multer.File): Promise<{
        image: string;
        name: string;
    } & import("../entities/film.entity").film>;
    findAll(name?: string, page?: string, limit?: string, sort?: 'asc' | 'desc'): Promise<{
        data: import("../entities/film.entity").film[];
        pagination: {
            total: number;
            currentPage: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<import("../entities/film.entity").film>;
    update(id: string, updateFilmDto: UpdateFilmDto, file?: Express.Multer.File): Promise<import("../entities/film.entity").film>;
    remove(id: string): Promise<{
        message: string;
        film: import("../entities/film.entity").film;
    }>;
}
