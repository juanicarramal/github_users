import { FavoritesService } from '../../src/favorites/favorites.service';

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    service = new FavoritesService();
  });

  it('debe agregar un favorito', () => {
    service.addFavorite('juanicarramal');
    const favorites = service.findAllFavorites();
    expect(favorites).toContain('juanicarramal');
  });

  it('debe retornar true si el usuario es favorito', () => {
    service.addFavorite('juanicarramal');
    const isFavorite = service.isFavorite('juanicarramal');
    expect(isFavorite).toBe(true);
  });

  it('debe retornar false si el usuario no es favorito', () => {
    const isFavorite = service.isFavorite('noexiste');
    expect(isFavorite).toBe(false);
  });
});
