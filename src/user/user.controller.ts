import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
    type: GetUsersDto,
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
    type: SearchUsersDto,
  })
  async searchUsers(@Query() dto: SearchUsersDto) {
    return this.userService.searchUsers(dto);
  }

  @Get(':username')
  @ApiOperation({
    summary: 'Obtener detalles de un usuario de Github por su nombre',
  })
  @ApiResponse({
    status: 200,
    description: 'Detalles del usuario obtenidos correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
  })
  @ApiParam({
    name: 'username',
    description: 'Nombre de usuario de Github',
    type: String,
  })
  async getUserDetails(@Param('username') username: string) {
    return this.userService.getUserDetails(username);
  }
}
