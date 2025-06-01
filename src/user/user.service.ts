import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { SearchUsersDto } from './dto/search-users.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { FavoritesService } from 'src/favorites/favorites.service';
import { parseLinkHeader } from 'src/shared/utils/parse-link-header';

@Injectable()
export class UserService {
  constructor(private readonly favoritesService: FavoritesService) {}

  async getUsers(dto: GetUsersDto) {
    try {
      const response = await axios.get(`${process.env.BASE_URL}/users`, {
        params: {
          per_page: dto.per_page,
          page: dto.page,
        },
        headers: {
          'User-Agent': 'NestJS User Service',
        },
      });

      const pagination = parseLinkHeader(response.headers['link']);

      const users = response.data.map((user) => ({
        login: user.login,
        avatar_url: user.avatar_url,
        url: user.url,
      }));

      return {
        data: users,
        pagination,
      };
    } catch (error) {
      console.error(`Error de Github API: ${error.message}`);
      throw new InternalServerErrorException(
        'Error al obtener usuarios de Github',
      );
    }
  }

  async searchUsers(dto: SearchUsersDto) {
    try {
      const response = await axios.get(`${process.env.BASE_URL}/search/users`, {
        params: {
          q: dto.term,
          per_page: dto.per_page,
          page: dto.page,
        },
        headers: {
          'User-Agent': 'NestJS User Service',
        },
      });

      const pagination = parseLinkHeader(response.headers['link']);

      const users = response.data.items.map((user) => ({
        login: user.login,
        avatar_url: user.avatar_url,
        url: user.url,
      }));

      return {
        data: users,
        pagination,
      };
    } catch (error) {
      console.error(`Error de Github API: ${error.message}`);
      throw new InternalServerErrorException(
        'Error al buscar usuarios en Github',
      );
    }
  }

  async getUserDetails(username: string) {
    try {
      const response = await axios.get(
        `${process.env.BASE_URL}/users/${username}`,
        {
          headers: {
            'User-Agent': 'NestJS User Service',
          },
        },
      );

      return {
        avatar_url: response.data.avatar_url,
        login: response.data.login,
        name: response.data.name,
        bio: response.data.bio,
        repos_url: response.data.repos_url,
        public_repos: response.data.public_repos,
        followers: response.data.followers,
        following: response.data.following,
        crated_at: response.data.created_at,
        is_favorite: this.favoritesService.isFavorite(username), // Asumiendo que tienes un servicio de favoritos inyectado
      };
    } catch (error) {
      console.error(
        `Error de Github API al obtener detalles del usuario ${username}: ${error.message}`,
      );
      throw new InternalServerErrorException(
        `Error al obtener detalles del usuario ${username}`,
      );
    }
  }
}
