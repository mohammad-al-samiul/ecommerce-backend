import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Cart } from './entiies/cart.entity';
import { ProductsService } from 'src/products/products.service';
import { AddToCartDto } from './dto/cart.dto';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    private productsService: ProductsService,
  ) {}

  async addProduct(userId: number, payload: AddToCartDto) {
    const { quantity, productId } = payload;
    const product = await this.productsService.getOneProduct(productId);
    if (!product) {
      throw new NotFoundException('Product not found!');
    }
    if (product.stock < quantity) {
      throw new BadRequestException('Insufficient Stock');
    }
    let item = await this.cartRepo.findOne({
      where: { user: { id: userId }, product: { id: productId } },
    });
    if (item) {
      const newQty = item.quantity + quantity;
      if (product.stock < newQty)
        throw new BadRequestException('Insufficient stock');
      item.quantity = newQty;
    } else {
      item = this.cartRepo.create({
        user: { id: userId } as any,
        product: { id: productId } as any,
        quantity,
      });
    }
    await this.cartRepo.save(item);
    return { message: 'Product added in cart successfully' };
  }
}
