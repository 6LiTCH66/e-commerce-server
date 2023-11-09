import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";
import { ProductService } from "../../product/product.service";
import { Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";


export function isQuantityOverLimit(validationOptions?: ValidationOptions){
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: QuantityLimitValidator,
    });
  };
}

/**
 *  Validator that checks if quantity is not over the limit
 */
@ValidatorConstraint({name: "quantity", async: true})
@Injectable()
export class QuantityLimitValidator implements ValidatorConstraintInterface{

  constructor(private productService: ProductService) {}
  async validate(quantity: number, validationArguments?: ValidationArguments) {

    const productId = validationArguments.object["productId"]
    const productVariantsId = validationArguments.object["productVariantsId"]

    const findProduct = await this.productService.getProductWithProductVariant(productId, productVariantsId)

    if (findProduct.stockQuantity < quantity){
      throw new NotAcceptableException("Quantity cannot be greater than stock quantity of product!")
    }

    return true;
  }

}