import { IsInt, IsPositive } from 'class-validator';

export class AddToCartDto {
  @IsInt()
  productId: number;

  @IsInt()
  @IsPositive()
  quantity: number;
}

export class UpdateToCartDto {
  @IsInt()
  @IsPositive()
  quantity: number;
}
