package todo.services;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import todo.dto.ProjectDto;
import todo.dto.ProjectDtoList;
import todo.entities.Project;
import todo.repositories.ProjectRepository;

import javax.annotation.Resource;
import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {
	
	@Resource
	private ProjectRepository projectRepository;
	
	@Resource
	private ProjectHelper helper;

    @Autowired
    private SessionFactory sessionFactory;

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
	}

	@Override
	public ProjectDto getProject(int id) {
		Project project = projectRepository.findOne(id);
		return helper.toDto(project);
	}

	@Override
	public ProjectDto updateProject(int id, ProjectDto dto) {
	    Session session = sessionFactory.openSession();
		Project project = projectRepository.findOne(id);
		int oldOrder = project.getProjectOrder();
		int newOrder = dto.getOrder();
		if(oldOrder > newOrder) {
//			List<Project> reorderedProjects = new ArrayList<>();
            List<Project> reorderedProjects = session.createCriteria(Project.class).add(Restrictions.between("projectOrder", newOrder, oldOrder-1)).list();
            session.close();
            for(Project reorderedProject: reorderedProjects) {
                int projectOrder = reorderedProject.getProjectOrder();
                reorderedProject.setProjectOrder(projectOrder+1);
            }
            projectRepository.save(reorderedProjects);
//			for(int i=newOrder;i<oldOrder;i++) {
//
//                List<Project> projects = session.createCriteria(Project.class).add(Restrictions.b
//                session.close();
//				Project queryProject = new Project();
//				queryProject.setProjectOrder(i);
//				Example<Project> example = Example.of(queryProject);
////                List<Project> projects = projectRepository.findAll(example);
//				Project reorderedProject = (Project) session.createCriteria(Project.class).add(Restrictions.eq("projectOrder", i)).list().get(0);
//				reorderedProject.setProjectOrder(i+1);
//				reorderedProjects.add(reorderedProject);
//			}
//			projectRepository.save(reorderedProjects);
		}
		else if(oldOrder < newOrder) {
			List<Project> reorderedProjects = session.createCriteria(Project.class).add(Restrictions.between("projectOrder", oldOrder+1, newOrder)).list();
			session.close();
            for(Project reorderedProject: reorderedProjects) {
                int projectOrder = reorderedProject.getProjectOrder();
                reorderedProject.setProjectOrder(projectOrder-1);
            }
            projectRepository.save(reorderedProjects);
//			List<Project> reorderedProjects = new ArrayList<>();
//			for(int i=oldOrder+1;i<=newOrder;i++) {
//				Project queryProject = new Project();
//				queryProject.setProjectOrder(i);
//				Example<Project> example = Example.of(queryProject);
//				Project reorderedProject = projectRepository.findAll(example).get(0);
//				reorderedProject.setProjectOrder(i-1);
//				reorderedProjects.add(reorderedProject);
//			}
//			projectRepository.save(reorderedProjects);
		}
		project.setProjectOrder(newOrder);
		projectRepository.save(project);
		return helper.toDto(project);
	}
}
