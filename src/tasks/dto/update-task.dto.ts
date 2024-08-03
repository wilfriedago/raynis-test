import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({
    description: 'The name of the task',
    example: 'Task 1',
    required: true,
  })
  @IsString()
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

  @ApiProperty({
    description: 'The URL of the file attached to the task',
    example: 'https://example.com/file.pdf',
    required: false,
  })
  @IsString()
  fileUrl: string;
}
