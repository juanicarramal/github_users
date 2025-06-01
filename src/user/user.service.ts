import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { parseLinkHeader } from 'src/shared/utils/parse-link-header';
import { SearchUsersDto } from './dto/search-users.dto';
import { GetUsersDto } from './dto/get-users.dto';

@Injectable()
export class UserService {
  async getUsers(dto: GetUsersDto) {
    try {
      const response = await axios(`${process.env.BASE_URL}/users`, {
        method: 'GET',
        params: {
          per_page: dto.per_page,
          page: dto.page
        },
        headers: {
          'User-Agent': 'NestJS User Service',
        }
      });

      const pagination = parseLinkHeader(response.headers['link']);

      const users = response.data.map(user => ({
        login: user.login,
        avatar_url: user.avatar_url,
        url: user.url,
      }));

      return {
        data: users,
        pagination
      };
    } catch (error) {
      console.error(`Error de Github API: ${error.message}`);
      throw new InternalServerErrorException('Error al obtener usuarios de Github');
    }
  }

  async searchUsers(dto: SearchUsersDto) {
    try {
      const response = await axios(`${process.env.BASE_URL}/search/users`, {
        method: 'GET',
        params: {
          q: dto.term,
          per_page: dto.per_page,
          page: dto.page
        },
        headers: {
          'User-Agent': 'NestJS User Service',
        }
      });

      const pagination = parseLinkHeader(response.headers['link']);

      const users = response.data.items.map(user => ({
        login: user.login,
        avatar_url: user.avatar_url,
        url: user.url,
      }));

      return {
        data: users,
        pagination
      };
    } catch (error) {
      console.error(`Error de Github API: ${error.message}`);
      throw new InternalServerErrorException('Error al buscar usuarios en Github');
    }
  }
}
