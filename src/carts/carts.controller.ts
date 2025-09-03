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
  UseGuards,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { AddToCartDto, UpdateToCartDto } from './dto/cart.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('carts')
export class CartsController {
  constructor(private cartsService: CartsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
  addToCart(@Req() req: any, @Body() addCartDto: AddToCartDto) {
    return this.cartsService.addToCart(req.user.id, addCartDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllCartItem(@Req() req: any) {
    return this.cartsService.getAllCartItem(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  removeToCart(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.cartsService.removeToCart(req.user.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  clearToCart(@Req() req: any) {
    return this.cartsService.clearToCart(req.user.id);
  }
}
