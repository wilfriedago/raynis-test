import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'The name of the task',
    example: 'Task 1',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The description of the task',
    example: 'Description of Task 1',
    required: true,
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The status of the task',
    example: false,
    required: false,
  })
  @IsBoolean()
  isCompleted: boolean;
}
