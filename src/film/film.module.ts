import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FilmService } from "./film.service";
import { FilmController } from "./film.controller";
import { film, filmSchema } from "../entities/film.entity";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: film.name, schema: filmSchema }]),
    ],
    controllers: [FilmController],
    providers: [FilmService],
})
export class FilmModule {}
