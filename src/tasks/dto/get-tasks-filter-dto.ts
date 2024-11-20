import { TaskStatus } from '../mappers/task';

export class GetTasksFilterDto {
  status?: TaskStatus;
  search?: string;
}
