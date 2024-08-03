import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>,
  ) {}

  create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.repository.create(createTaskDto);
    return this.repository.save(task);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    const task = await this.repository.findOne({ where: { id } });

    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const { affected } = await this.repository.update(id, updateTaskDto);

    if (!affected) {
      throw new HttpException(
        'The task you are trying to update does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.findOne(id);
  }

  async remove(id: string) {
    const { affected } = await this.repository.delete(id);

    if (!affected) {
      throw new HttpException(
        'The task you are trying to delete does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
