package todo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import todo.entities.Project;

public interface ProjectRepository extends JpaRepository<Project, Integer>{

}
