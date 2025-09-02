import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  price: number;

  @IsInt()
  @Min(0)
  stock: number;
}
