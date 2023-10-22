import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import { GetUser } from "../auth/decorator";
import { User } from "@prisma/client";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

}
