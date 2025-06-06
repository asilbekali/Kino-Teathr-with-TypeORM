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
exports.AuthorService = void 0;
const common_1 = require("@nestjs/common");
const author_entity_1 = require("../entities/author.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let AuthorService = class AuthorService {
    AuthorRepo;
    constructor(AuthorRepo) {
        this.AuthorRepo = AuthorRepo;
    }
    async create(createAuthorDto, file) {
        try {
            let bazaAuthor = await this.AuthorRepo.findOne({ where: { name: createAuthorDto.name } });
            if (bazaAuthor) {
                throw new common_1.BadRequestException("User alread exists !");
            }
            let newAuthoer = this.AuthorRepo.create(createAuthorDto);
            this.AuthorRepo.save(newAuthoer);
            return newAuthoer;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async findAll() {
        try {
            return await this.AuthorRepo.find();
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async findOne(id) {
        try {
            const author = await this.AuthorRepo.findOne({ where: { id } });
            if (!author) {
                throw new common_1.NotFoundException("Author not found");
            }
            return author;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async update(id, updateAuthorDto, file) {
        try {
            const updatedData = {
                ...updateAuthorDto,
                image: file?.filename || undefined,
            };
            const result = await this.AuthorRepo.update(id, updatedData);
            if (!result.affected) {
                throw new common_1.NotFoundException("Author not found");
            }
            const bazaAuthor = await this.AuthorRepo.findOne({ where: { id } });
            return bazaAuthor;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async remove(id) {
        try {
            const author = await this.AuthorRepo.findOne({ where: { id } });
            this.AuthorRepo.delete(id);
            if (!author) {
                throw new common_1.NotFoundException("Author not found");
            }
            return { message: "Author successfully deleted", author };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.AuthorService = AuthorService;
exports.AuthorService = AuthorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(author_entity_1.Author)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuthorService);
//# sourceMappingURL=author.service.js.map