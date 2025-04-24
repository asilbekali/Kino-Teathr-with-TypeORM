import { CreateFilmDto } from "./dto/create-film.dto";
import { UpdateFilmDto } from "./dto/update-film.dto";
import { film } from "../entities/film.entity";
import { Repository } from "typeorm";
export declare class FilmService {
    private filimRepo;
    constructor(filimRepo: Repository<film>);
    create(createFilmDto: CreateFilmDto, file: Express.Multer.File): Promise<{
        image: string;
        name: string;
    } & film>;
    findAll(query: {
        name?: string;
        page?: number;
        limit?: number;
        sort?: "asc" | "desc";
    }): Promise<{
        data: film[];
        pagination: {
            total: number;
            currentPage: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<film>;
    update(id: number, updateFilmDto: UpdateFilmDto, file?: Express.Multer.File): Promise<film>;
    remove(id: number): Promise<{
        message: string;
        film: film;
    }>;
}
