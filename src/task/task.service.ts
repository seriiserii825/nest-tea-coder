import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  private tasks = [
    { id: 1, name: 'Sample Task', isCompleted: false },
    { id: 2, name: 'Another Task', isCompleted: true },
  ];
  findAll() {
    return this.tasks;
  }

  findById(id: number) {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  create(dto: CreateTaskDto) {
    const { title, priority } = dto;
    const newTask = {
      id: Date.now(),
      name: title,
      priority,
      isCompleted: false,
    };
    const is_unique = !this.tasks.find((task) => task.name === title);
    if (!is_unique) {
      throw new ConflictException('Task with this name already exists');
    }
    this.tasks.push(newTask);
    return newTask;
  }

  update(id: number, dto: UpdateTaskDto) {
    const { title, isCompleted } = dto;

    const task = this.findById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    task.name = title;
    task.isCompleted = isCompleted;
    this.tasks = this.tasks.map((t) => (t.id === id ? task : t));
    return task;
  }

  delete(id: number) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException('Task not found');
    }
    const deletedTask = this.tasks[taskIndex];
    this.tasks.splice(taskIndex, 1);
    return deletedTask;
  }
}
