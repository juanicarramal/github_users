import axios from 'axios';
import { UserService } from "../../src/user/user.service";
import { Test, TestingModule } from "@nestjs/testing";
import { FavoritesService } from "../../src/favorites/favorites.service";
import { GetUsersDto } from 'src/user/dto/get-users.dto';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('UserService', () => {
  let service: UserService;
  let favoritesService: FavoritesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
        {
        providers: [UserService, FavoritesService],
        }
    ).compile();

    service = module.get<UserService>(UserService);
    favoritesService = module.get<FavoritesService>(FavoritesService);
    jest.clearAllMocks();
  });

  it('debe buscar usuarios paginados', async () => {
    const dto: GetUsersDto = {
        page: 1,
        per_page: 10,
    };

    const mockUsers = [
        {
            login: 'juanicarramal',
            avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
            url: 'https://api.github.com/users/juanicarramal',
        },
        {
            login: 'mojombo',
            avatar_url: 'https://avatars.githubusercontent.com/u/2?v=4',
            url: 'https://api.github.com/users/mojombo',
        },
    ];

    mockedAxios.get.mockResolvedValue({
      data: mockUsers,
      headers: {
        link: '<https://api.github.com/users?since=0&page=2>; rel="next", <https://api.github.com/users?since=0&page=3>; rel="last"'
      },
    });

    const result = await service.getUsers(dto);
    expect(result.data).toEqual(mockUsers);
    expect(result.pagination.next).toContain('since=0&page=2');
  });

  it('debe buscar detalle de usuario con is_favorite en true', async () => {
    const username = 'juanicarramal';
    const mockUser = {
        login: 'juanicarramal',
        avatar_url: 'url',
        name: 'Juan Carramal',
        bio: 'Software Engineer',
        repos_url: 'https://api.github.com/users/juanicarramal/repos',
        public_repos: 5,
        followers: 10,
        following: 2,
        created_at: '2020-01-01T00:00:00Z',
    }

    mockedAxios.get.mockResolvedValue({ data: mockUser });
    favoritesService.addFavorite(username);

    const result = await service.getUserDetails(username);
    expect(result.login).toBe(username);
    expect(result.is_favorite).toBe(true);
  });

});