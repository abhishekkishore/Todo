package todo.services;

import todo.dto.ProjectDto;
import todo.dto.ProjectDtoList;

public interface ProjectService {
	public ProjectDtoList getProjects();
	
	public ProjectDto getProject(int id);
	
	public ProjectDto createProject(ProjectDto dto);
	
	public void deleteProject(int id);
	
	public ProjectDto updateProject(int id, ProjectDto dto);
}
