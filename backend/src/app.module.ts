import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { Cart } from './typeorm/entities/Cart';
import { CartItem } from './typeorm/entities/CartItem';
import { Product } from './typeorm/entities/Product';
import { Order } from './typeorm/entities/Order';
import { OrderItem } from './typeorm/entities/OrderItem';
import { ProductsModule } from './modules/products/products.module';
import { CartModule } from './modules/cart/cart.module';
import { configurations } from './config/config';

@Module({
  imports: [AuthModule,ProductsModule,CartModule,TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: configurations.DB_USERNAME,
      password: configurations.DB_PASSWORD,
      database: 'ecommerce',
      entities: [User,Cart,CartItem,Product,Order,OrderItem],
      synchronize: true,
    })],
  controllers: [],
  providers: [],
})
export class AppModule {}
