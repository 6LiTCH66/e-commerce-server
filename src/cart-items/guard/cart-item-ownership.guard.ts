import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { CartService } from "../../cart/cart.service";
import { User } from "@prisma/client";

/**
 * Guard that checks if current user own this cart item
 */
@Injectable()
export class CartItemOwnershipGuard implements CanActivate{
  constructor(private cartService: CartService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const user: User = request.user;
    const cartItemId = parseInt(request.params.id);

    if (isNaN(cartItemId)){
      throw new UnauthorizedException()
    }

    return this.validateCartItemOwnership(user, cartItemId);
  }

  private async validateCartItemOwnership(user: User, cartItemId: number){
    const cartItemExistence = await this.cartService.isCartExistWithProductVariant(user.id, cartItemId)

    if (!cartItemExistence){
      throw new ForbiddenException("You do not own this cart!")
    }

    return true
  }


}