import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUsersDto } from './dto/get-users.dto';
import { SearchUsersDto } from './dto/search-users.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener lista de usuarios de Github con paginación',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios obtenida correctamente',
    schema: {
      example: {
        data: [
              {
                login: "juanicarramal",
                avatar_url: "https://avatars.githubusercontent.com/u/31519467?v=4",
                url: "https://api.github.com/users/juanicarramal"
              }
            ],
        pagination: {
          next: 'https://api.github.com/users?since=31519467&per_page=10',
          previous: null,
        }
      }
    }
  })
  async getUsers(@Query() dto: GetUsersDto) {
    return this.userService.getUsers(dto);
  }

  @Get('/search-users')
  @ApiOperation({
    summary: 'Buscar usuarios en Github por un término con paginación',
  })
  @ApiResponse({
    status: 200,
    description:
      'Lista de usuarios que coinciden con el término de búsqueda obtenida correctamente',
    schema: {
      example: {
        data: [
          {
            login: "juanicarramal",
            avatar_url: "https://avatars.githubusercontent.com/u/31519467?v=4",
            url: "https://api.github.com/users/juanicarramal"
          }
        ],
        pagination: {
          next: 'https://api.github.com/users?since=31519467&per_page=10',
          previous: null,
        }
      }
    }
  })
  async searchUsers(@Query() dto: SearchUsersDto) {
    return this.userService.searchUsers(dto);
  }

  @Get(':username')
  @ApiOperation({
    summary: 'Obtener detalles de un usuario de Github por su nombre',
  })
  @ApiParam({
    name: 'username',
    description: 'Nombre de usuario de Github',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Detalles del usuario con is_favorite en true si está en favoritos',
    schema: {
      example: {
        login: "juanicarramal",
        avatar_url: "https://avatars.githubusercontent.com/u/31519467?v=4",
        name: "Juan Carramal",
        bio: "Desarrollador Full Stack",
        repos_url: "https://api.github.com/users/juanicarramal/repos",
        public_repos: 10,
        followers: 100,
        following: 50,
        created_at: "2017-01-01T00:00:00Z",
        is_favorite: true
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
  })
  async getUserDetails(@Param('username') username: string) {
    return this.userService.getUserDetails(username);
  }
}
