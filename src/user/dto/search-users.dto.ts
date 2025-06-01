import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class SearchUsersDto {
  @ApiProperty({
    description: 'Térrmino de busqueda de usuarios',
    example: 'juan',
  })
  @IsString()
  term: string;

  @ApiPropertyOptional({
    description: 'Número de usuarios por página',
    default: 30,
    minimum: 1,
    example: 30,
    type: Number,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  per_page: number = 30;

  @ApiPropertyOptional({
    description: 'Número de página a recuperar',
    default: 1,
    minimum: 1,
    example: 1,
    type: Number,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  page: number = 1;
}
