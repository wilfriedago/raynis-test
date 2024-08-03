import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  @IsString()
  firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  @IsString()
  lastname: string;

  @ApiProperty({
    description: 'User email',
    example: 'test@example.com',
  })
  @Transform(({ value }) => value.toLowerCase())
  @IsEmail()
  email: string;
}
