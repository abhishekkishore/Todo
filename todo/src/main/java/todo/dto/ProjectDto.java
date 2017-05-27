package todo.dto;

public class ProjectDto {
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public TaskDto[] getTasks() {
		return tasks;
	}

	public void setTasks(TaskDto[] tasks) {
		this.tasks = tasks;
	}

	private String name;
	
	private String description;
	
	private TaskDto[] tasks;
	
	private String id;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
}
