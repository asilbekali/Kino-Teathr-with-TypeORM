import {
    Injectable,
    BadRequestException,
    NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { UpdateAuthorDto } from "./dto/update-author.dto";
import { Author } from "../entities/author.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AuthorService {
    constructor(
        @InjectRepository(Author) private AuthorRepo: Repository<Author>
    ) {}

    async create(createAuthorDto: CreateAuthorDto, file?: Express.Multer.File) {
        try {
            let newAuthoer = await this.AuthorRepo.create(createAuthorDto);

            return await this.AuthorRepo.save(newAuthoer);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async findAll() {
        try {
            return await this.AuthorRepo.find();
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async findOne(id: number) {
        try {
            const author = await this.AuthorRepo.findOne({ where: { id } });
            if (!author) {
                throw new NotFoundException("Author not found");
            }
            return author;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async update(
        id: number,
        updateAuthorDto: UpdateAuthorDto,
        file?: Express.Multer.File
    ) {
        try {
            const updatedData = {
                ...updateAuthorDto,
                image: file?.filename || undefined,
            };

            const result = await this.AuthorRepo.update(id, updatedData);

            if (!result.affected) {
                throw new NotFoundException("Author not found");
            }

            const bazaAuthor = await this.AuthorRepo.findOne({ where: { id } });

            return bazaAuthor;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async remove(id: number) {
        try {
            const author = await this.AuthorRepo.findOne({ where: { id } });
            this.AuthorRepo.delete(id);
            if (!author) {
                throw new NotFoundException("Author not found");
            }
            return { message: "Author successfully deleted", author };
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}

// tolqi crud type ormga otkazildi
