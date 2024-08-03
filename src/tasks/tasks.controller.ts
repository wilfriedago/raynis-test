import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller({ path: 'tasks', version: '1' })
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Create a new task' })
  @ApiCreatedResponse({
    description: 'The task has been successfully created.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid data.',
  })
  @ApiUnauthorizedResponse({
    description: 'The request requires user authentication.',
  })
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @ApiOperation({ summary: 'Get all tasks' })
  @ApiOkResponse({
    description: 'Successfully retrieved all tasks.',
  })
  @ApiUnauthorizedResponse({
    description: 'The request requires user authentication.',
  })
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiOkResponse({
    description: 'Successfully retrieved the task.',
  })
  @ApiNotFoundResponse({
    description: 'The task was not found.',
  })
  @ApiUnauthorizedResponse({
    description: 'The request requires user authentication.',
  })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a task by ID' })
  @ApiOkResponse({
    description: 'The task has been successfully updated.',
  })
  @ApiNotFoundResponse({
    description: 'The task was not found.',
  })
  @ApiUnauthorizedResponse({
    description: 'The request requires user authentication.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid data.',
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiOkResponse({
    description: 'The task has been successfully deleted.',
  })
  @ApiNotFoundResponse({
    description: 'The task was not found.',
  })
  @ApiUnauthorizedResponse({
    description: 'The request requires user authentication.',
  })
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.remove(id);
  }
}
