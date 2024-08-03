import { User } from '@/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface,
} from 'class-validator';
import { registerDecorator, ValidatorConstraint } from 'class-validator';
import { Repository } from 'typeorm';

export const IS_EMAIL_UNIQUE = 'isEmailUnique';

@Injectable()
@ValidatorConstraint({ name: IS_EMAIL_UNIQUE, async: true })
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async validate(value: string) {
    return !(await this.repository.existsBy({ email: value }));
  }

  defaultMessage(args: ValidationArguments) {
    return `Email ${args.value} already exists`;
  }
}

export const IsEmailUnique = (validationOptions?: ValidationOptions) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: IS_EMAIL_UNIQUE,
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsEmailUniqueConstraint,
    });
  };
};
