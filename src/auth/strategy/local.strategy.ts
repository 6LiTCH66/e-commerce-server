import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { PrismaService } from "../../prisma/prisma.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { AuthDto } from "../dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }
  async validate(email: string, password: string){
    const dto: AuthDto = {
      email: email,
      password: password
    }

    const user = await this.authService.singin(dto)

    if (!user){
      throw new UnauthorizedException();
    }

    return user;
  }
}