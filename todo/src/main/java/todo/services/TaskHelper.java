package todo.services;

import org.springframework.stereotype.Component;

import todo.dto.TaskDto;
import todo.entities.Project;
import todo.entities.Task;

@Component
public class TaskHelper {
	public Task toEntity(TaskDto dto, Project project) {
		Task task = new Task();
		task.setDescription(dto.getDescription());
		task.setDueDate(dto.getDueDate());
		task.setName(dto.getName());
		task.setProject(project);
		return task;
	}
	
	public TaskDto toDto(Task task) {
		TaskDto dto = new TaskDto();
		dto.setDescription(task.getDescription());
		dto.setDueDate(task.getDueDate());
		dto.setName(task.getName());
		dto.setProjectId(String.valueOf(task.getProject().getProjectId()));
		return dto;
	}
}
