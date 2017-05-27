package todo.services;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.stereotype.Component;

import todo.dto.ProjectDto;
import todo.dto.ProjectDtoList;
import todo.entities.Project;

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
		return dto;
	}
	
	public Project toEntity(ProjectDto dto) {
		Project project = new Project();
		project.setName(dto.getName());
		project.setDescription(dto.getDescription());
		return project;
	}
}
