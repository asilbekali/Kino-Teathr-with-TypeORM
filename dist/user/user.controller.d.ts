import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(data: CreateUserDto): Promise<import("../entities/user.entity").User>;
    login(data: UpdateUserDto): Promise<{
        token: string;
    }>;
    meUser(): Promise<string>;
}
