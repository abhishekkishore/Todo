package todo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import todo.entities.Task;

public interface TaskRepository extends JpaRepository<Task, Integer> {

}
