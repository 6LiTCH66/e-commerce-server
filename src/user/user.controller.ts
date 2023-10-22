import { Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { GetUser } from "../auth/decorator";
import { User } from "@prisma/client";
import { AuthenticatedGuard } from "../auth/guard";

@UseGuards(AuthenticatedGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: User){
    return user;
  }
  @Patch("edit")
  editUser(){
    return "edit user"
  }
}
