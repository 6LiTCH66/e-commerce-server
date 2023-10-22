import { Body, Controller, Delete, Get, Post, Req, Res, Session, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { AuthenticatedGuard, LocalAuthGuard } from "./guard";
import { GetUser } from "./decorator";
import { User } from "@prisma/client";
import {Request, Response} from 'express'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  singin(@Body() dto: AuthDto, @GetUser() user: User){
    return user

  }
  @Post('signup')
  signup(@Body() dto: AuthDto){
    return this.authService.singup(dto)

  }
  @UseGuards(AuthenticatedGuard)
  @Delete("signout")
  signout(@Req() req: Request, @Res() res: Response){
    req.session.destroy(null);
    res.clearCookie("connect.sid");
    return res.send({message: "You have been signed out successfully!"})
  }
}
