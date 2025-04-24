import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../entities/user.entity";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly user: Repository<User>,
        private readonly jwt: JwtService
    ) {}

    async findUser(name: string) {
        let user = await this.user.findOne({ where: { name } });
        return user;
    }

    async register(data: CreateUserDto) {
        let user = await this.findUser(data.name);
        if (user) {
            throw new BadRequestException("User already exists !");
        }
        let hash = bcrypt.hashSync(data.password, 10);

        let newUser = this.user.create({
            ...data,
            password: hash,
        });

        this.user.save(newUser)

        return newUser
    }

    async login(data: UpdateUserDto) {
        if (!data.name || !data.password) {
            throw new BadRequestException(
                "Name and password are required for login!"
            );
        }

        let user = await this.findUser(data.name);
        if (!user) {
            throw new BadRequestException("User not found");
        }

        let match = bcrypt.compareSync(data.password, user.password);
        if (!match) {
            throw new BadRequestException("Invalid password!");
        }

        let token = this.jwt.sign({
            id: user.id,
            role: user.role,
        });
        return { token };
    }

    async userData() {
        return "sorry wrong request !";
    }
}
