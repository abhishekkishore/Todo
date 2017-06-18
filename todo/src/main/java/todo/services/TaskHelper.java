package todo.services;

import org.springframework.stereotype.Component;

import todo.dto.TaskDto;
import todo.entities.Task;

@Component
public class TaskHelper {
	public Task toEntity(TaskDto dto) {
		Task task = new Task();
		task.setDescription(dto.getDescription());
		task.setDueDate(dto.getDueDate());
		task.setName(dto.getName());
		task.setProject(dto.getProject());
		return task;
	}
	
	public TaskDto toDto(Task task) {
		TaskDto dto = new TaskDto();
		dto.setDescription(task.getDescription());
		dto.setDueDate(task.getDueDate());
		dto.setName(task.getName());
		dto.setProject(task.getProject());
		return dto;
	}
}
