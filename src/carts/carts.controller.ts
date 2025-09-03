/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { AddToCartDto, UpdateToCartDto } from './dto/cart.dto';

@Controller('carts')
export class CartsController {
  constructor(private cartsService: CartsService) {}

  @Post('')
  addToCart(@Req() req: any, @Body() addCartDto: AddToCartDto) {
    return this.cartsService.addToCart(req.user.id, addCartDto);
  }

  @Get()
  getAllCartItem(@Req() req: any) {
    return this.cartsService.getAllCartItem(req.user.id);
  }

  @Patch(':id')
  updateToCart(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateToCart: UpdateToCartDto,
  ) {
    return this.cartsService.updateToCart(
      req.user.id,
      id,
      updateToCart.quantity,
    );
  }

  @Delete(':id')
  removeToCart(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.cartsService.removeToCart(req.user.id, id);
  }

  @Delete()
  clearToCart(@Req() req: any) {
    return this.cartsService.clearToCart(req.user.id);
  }
}
