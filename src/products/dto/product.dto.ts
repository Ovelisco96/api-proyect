import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsPositive, IsString, Min, ValidateIf } from "class-validator";

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  price: number;
  @IsString()
  @IsNotEmpty()
  fechaEntrega: Date;
  @IsString()
  @IsNotEmpty()
  ingredientsIds: number[];
}

export class FilterProductDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty()
  limit: number;

  @IsOptional()
  @Min(0)
  @ApiProperty()
  offset: number;

  @IsOptional()
  @IsPositive()
  @Min(0)
  minPrice: number;

  @ValidateIf((item) => item.minPrice)
  @IsPositive()
  maxPrice: number;
}