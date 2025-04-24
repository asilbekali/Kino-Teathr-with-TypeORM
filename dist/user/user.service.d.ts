import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "../entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
export declare class UserService {
    private readonly user;
    private readonly jwt;
    constructor(user: Repository<User>, jwt: JwtService);
    findUser(name: string): Promise<User | null>;
    register(data: CreateUserDto): Promise<User>;
    login(data: UpdateUserDto): Promise<{
        token: string;
    }>;
    userData(): Promise<string>;
}
