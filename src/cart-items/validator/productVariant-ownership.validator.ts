import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions, ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";
import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductService } from "../../product/product.service";


export function isProductVariantBelongToProduct(validationOptions?: ValidationOptions){
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: ProductVariantOwnershipValidator,
    });
  };

}

/**
 * Validator that checks if productVariantsId belong to productId
 */
@ValidatorConstraint({name: "productVariant", async: true})
@Injectable()
export class ProductVariantOwnershipValidator implements ValidatorConstraintInterface {
  constructor(private productService: ProductService) {}
  async validate(productVariantId: number, validationArguments?: ValidationArguments) {

    const productId = validationArguments.object["productId"]
    const productExistence = await this.productService.getProductWithProductVariant(productId, productVariantId)

    if (!productExistence){
      throw new NotFoundException(`ProductVariant with ID ${productVariantId} not found for product with ID ${productId}.`)
    }

    return true;
  }

}