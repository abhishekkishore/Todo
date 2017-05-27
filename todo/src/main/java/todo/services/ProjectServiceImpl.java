package todo.services;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import todo.dto.ProjectDto;
import todo.dto.ProjectDtoList;
import todo.entities.Project;
import todo.repositories.ProjectRepository;

@Service
public class ProjectServiceImpl implements ProjectService {
	
	@Resource
	private ProjectRepository projectRepository;
	
	@Resource
	private ProjectHelper helper;

	@Override
	public ProjectDtoList getProjects() {
		List<Project> projects = projectRepository.findAll();
		return helper.toDtoList(projects);
	}

	@Override
	public ProjectDto createProject(ProjectDto dto) {
		Project project = helper.toEntity(dto);
		Project createdProject = projectRepository.save(project);
		return helper.toDto(createdProject);
	}

	@Override
	public void deleteProject(int id) {
		projectRepository.delete(id);
//		return Constants.SUCCESS;
	}

}
