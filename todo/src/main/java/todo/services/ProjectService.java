package todo.services;

import todo.dto.ProjectDto;
import todo.dto.ProjectDtoList;

public interface ProjectService {
	public ProjectDtoList getProjects();
	
	public ProjectDto createProject(ProjectDto dto);
}
