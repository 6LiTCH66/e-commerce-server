import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { ReviewService } from "../review.service";
import { User } from "@prisma/client";

@Injectable()
export class ReviewOwnershipGuardGuard implements CanActivate{
  constructor(private reviewService: ReviewService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    const reviewId = parseInt(request.params.id);

    if (isNaN(reviewId)){
      throw new UnauthorizedException()
    }

    return this.validateReviewOwnership(user, reviewId)
  }

  private async validateReviewOwnership(user: User, reviewId: number){
    const review = await this.reviewService.getReviewById(reviewId)

    if (!review){
      throw new ForbiddenException("Review does not exist!")
    }

    if (review.userId !== user.id){
      throw new ForbiddenException("This review is not belong to you!")
    }

    return true;

  }

}