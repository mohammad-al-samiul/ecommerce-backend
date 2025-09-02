import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  //It injects the repository to work with the Product table in the database.
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async createProduct(payload: ProductDto) {
    const productInfo = this.productRepo.create(payload);
    const product = await this.productRepo.save(productInfo);
    return product;
  }

  async getAllProducts() {
    return await this.productRepo.find();
  }

  async getOneProduct(id: number) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async updateProduct(id: number, productInfo: Partial<ProductDto>) {
    const isProduct = await this.productRepo.findOne({ where: { id } });
    if (!isProduct) {
      throw new NotFoundException('Product not found');
    }
    Object.assign(isProduct, productInfo);

    const updatedProduct = await this.productRepo.save(isProduct);
    return updatedProduct;
  }

  async deleteProduct(id: number) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.productRepo.delete(id);
    return { message: 'Product deleted successfully' };
  }
}
