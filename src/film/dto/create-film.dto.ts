import { ApiProperty } from '@nestjs/swagger';

export class CreateFilmDto {
  @ApiProperty({
    description: 'Film name',
    example: 'Interesterller',
  })
  name: string;
}
