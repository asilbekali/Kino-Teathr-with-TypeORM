import { Role } from '../enum/role.enum';
export declare class CreateUserDto {
    name: string;
    age: number;
    password: string;
    gmail: string;
    phone: string;
    role: Role;
}
