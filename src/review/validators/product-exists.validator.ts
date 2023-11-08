import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ProductService } from "../../product/product.service";


export function isProductExists(validationOptions?: ValidationOptions){
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: ProductExistsValidator,
    });
  };

}

@ValidatorConstraint({name: 'product', async: true})
@Injectable()
export class ProductExistsValidator implements ValidatorConstraintInterface{
  constructor(private productService: ProductService) {}
  async validate(value: number) {
    const exists = await this.productService.getOneProduct(value)

    if (!exists){
      throw new BadRequestException(`Product with the id ${value} is not found!`)
    }

    return true
  }

}