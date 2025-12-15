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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrderModule } from './modules/orders/order.module';

@Module({
  imports: [AuthModule,ProductsModule,CartModule,OrderModule,ConfigModule.forRoot({
    isGlobal: true
  }),TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (config: ConfigService) => ({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: config.get<string>('DB_USERNAME'),
    password: config.get<string>('DB_PASSWORD'),
    database: 'ecommerce',
    entities: [User, Cart, CartItem, Product, Order, OrderItem],
    synchronize: true,
  }),
  inject: [ConfigService],
})],
  controllers: [],
  providers: [],
})
export class AppModule {}
