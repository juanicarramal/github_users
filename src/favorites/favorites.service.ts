import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoritesService {
  private readonly favorites = new Set<string>();

  addFavorite( username: string ): void {
    this.favorites.add(username.toLowerCase());
  }

  findAllFavorites(): string[] {
    return Array.from(this.favorites);
  }

  isFavorite( username: string ): boolean {
    return this.favorites.has(username.toLowerCase());
  }
}
