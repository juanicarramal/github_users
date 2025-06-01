import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FavoritesModule } from 'src/favorites/favorites.module';

@Module({
  imports: [FavoritesModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
