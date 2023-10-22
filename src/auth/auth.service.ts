import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "./dto";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async singin(dto: AuthDto){

    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      }
    })

    if (!user){
      throw new ForbiddenException("Creations incorrect")
    }

    const pwMatches = await bcrypt.compare(dto.password, user.password)

    if (!pwMatches){
      throw new ForbiddenException("Creations incorrect")
    }

    const {password, ...info} = user

    return info;

  }

  async singup(dto: AuthDto){
    const hash = await bcrypt.hash(dto.password, 5)

    try {

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash
        }
      })

      const {password, ...info} = user

      return info


    }catch (error){
      throw new ForbiddenException("Creations are taken")
    }
  }
}
