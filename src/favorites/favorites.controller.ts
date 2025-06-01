import {
  Controller,
  Get,
  Post,
  Param,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':username')
  @ApiOperation({
    summary: 'Agrega usuario a favoritos',
  })
  @ApiResponse({
    status: 201,
    description: 'Usuario agregado a favoritos correctamente',
    schema: {
      example: {
        message: 'Usuario juanicarramal agregado a favoritos',
      },
    },
  })
  @ApiParam({
    name: 'username',
    description: 'Nombre de usuario de Github a agregar a favoritos',
    type: String,
  })
  addFavorite(@Param('username') username: string) {
    this.favoritesService.addFavorite(username);
    return { message: `Usuario ${username} agregado a favoritos` };
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los usuarios favoritos',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios favoritos',
    schema: {
      example: {
        data: [
            'juanicarramal'
        ],
      },
    },
  })
  findAllFavorites() {
    return { data: this.favoritesService.findAllFavorites() };
  }
}
