import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class film {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    image: string;
}
