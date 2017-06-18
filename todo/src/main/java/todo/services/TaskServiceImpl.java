package todo.services;

import javax.annotation.Resource;

import todo.dto.TaskDto;
import todo.entities.Task;
import todo.repositories.TaskRepository;

public class TaskServiceImpl implements TaskService {

	@Resource
	private TaskHelper helper;
	
	@Resource
	private TaskRepository repository;
	
	@Override
	public TaskDto createTask(TaskDto dto) {
		Task task = helper.toEntity(dto);
		Task createdTask = repository.save(task);
		return helper.toDto(createdTask);
	}

}
