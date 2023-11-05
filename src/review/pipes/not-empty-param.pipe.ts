import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class NotEmptyParamPipe implements PipeTransform{
  transform(value: number, metadata: ArgumentMetadata): any {
    if (metadata.type === "param" && !value){
      throw new BadRequestException(`The parameter "${metadata.data}" must not be empty`)
    }

    return value;
  }

}