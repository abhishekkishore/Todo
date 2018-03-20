package todo.services;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Component;

import todo.dto.ProjectDto;
import todo.dto.ProjectDtoList;
import todo.dto.ProjectTaskDto;
import todo.entities.Project;
import todo.entities.Task;

@Component
public class ProjectHelper {
	public ProjectDtoList toDtoList(List<Project> projects) {
		ProjectDtoList dtoList = new ProjectDtoList();
		Iterator<Project> iterator = projects.iterator();
		List<ProjectDto> dtos = new ArrayList<>();
		while(iterator.hasNext()) {
			Project project = iterator.next();
			ProjectDto dto = toDto(project);
			dtos.add(dto);
		}
		
		dtoList.setMembers(dtos);
		return dtoList;
	}
	
	public ProjectDto toDto(Project project) {
		ProjectDto dto = new ProjectDto();
		dto.setDescription(project.getDescription());
		dto.setName(project.getName());
		dto.setId(String.valueOf(project.getProjectId()));
		dto.setOrder(project.getProjectOrder());
		
		if(project.getTasks() != null && project.getTasks().size() > 0) {
			Set<Task> tasks = project.getTasks();
			ProjectTaskDto[] taskDtos = new ProjectTaskDto[tasks.size()];
			
			Iterator<Task> taskIterator = tasks.iterator();
			int i = 0;
			while(taskIterator.hasNext()) {
				Task task = taskIterator.next();
				taskDtos[i] = new ProjectTaskDto();
				taskDtos[i].setId(String.valueOf(task.getTaskId()));
				taskDtos[i].setName(task.getName());
				i++;
			}
			dto.setTasks(taskDtos);
		}
		return dto;
	}
	
	public Project toEntity(ProjectDto dto) {
		Project project = new Project();
		project.setName(dto.getName());
		project.setDescription(dto.getDescription());
		project.setProjectOrder(dto.getOrder());
		return project;
	}
}
