import { CreateAuthorDto } from "./dto/create-author.dto";
import { UpdateAuthorDto } from "./dto/update-author.dto";
import { Author } from "../entities/author.entity";
import { Repository } from "typeorm";
export declare class AuthorService {
    private AuthorRepo;
    constructor(AuthorRepo: Repository<Author>);
    create(createAuthorDto: CreateAuthorDto, file?: Express.Multer.File): Promise<Author>;
    findAll(): Promise<Author[]>;
    findOne(id: number): Promise<Author>;
    update(id: number, updateAuthorDto: UpdateAuthorDto, file?: Express.Multer.File): Promise<Author | null>;
    remove(id: number): Promise<{
        message: string;
        author: Author;
    }>;
}
