import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

export class GetUsersDto {
    @ApiPropertyOptional({ 
        default: 30 , 
        description: 'Numero de usuarios por página',
        example: 30,
        minimum: 1,
        type: Number
     })
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsInt()
    @Min(1)
    per_page: number = 30;

    @ApiPropertyOptional({ 
        default: 1 , 
        description: 'Número de página a recuperar',
        example: 1,
        minimum: 1,
        type: Number
     })
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsInt()
    @Min(1)
    page: number = 1;
}