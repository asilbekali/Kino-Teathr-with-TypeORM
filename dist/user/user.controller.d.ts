import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(data: CreateUserDto): Promise<import("mongoose").Document<unknown, {}, import("../entities/user.entity").User> & import("../entities/user.entity").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    login(data: UpdateUserDto): Promise<{
        token: string;
    }>;
    meUser(): Promise<string>;
}
