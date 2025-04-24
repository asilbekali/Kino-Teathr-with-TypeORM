import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
export declare class AuthorController {
    private readonly authorService;
    constructor(authorService: AuthorService);
    create(createAuthorDto: CreateAuthorDto, file: Express.Multer.File): Promise<import("../entities/author.entity").Author>;
    findAll(): Promise<import("../entities/author.entity").Author[]>;
    findOne(id: string): Promise<import("../entities/author.entity").Author>;
    update(id: string, updateAuthorDto: UpdateAuthorDto, file?: Express.Multer.File): Promise<import("../entities/author.entity").Author | null>;
    remove(id: string): Promise<{
        message: string;
        author: import("../entities/author.entity").Author;
    }>;
}
