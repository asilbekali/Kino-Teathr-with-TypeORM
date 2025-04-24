import { Module } from "@nestjs/common";
import { FilmService } from "./film.service";
import { FilmController } from "./film.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { film } from "src/entities/film.entity";

@Module({
    imports: [TypeOrmModule.forFeature([film])],
    controllers: [FilmController],
    providers: [FilmService],
})
export class FilmModule {}
