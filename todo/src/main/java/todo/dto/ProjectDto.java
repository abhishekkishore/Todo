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

	public ProjectTaskDto[] getTasks() {
		return tasks;
	}

	public void setTasks(ProjectTaskDto[] tasks) {
		this.tasks = tasks;
	}

	private String name;
	
	private String description;
	
	private ProjectTaskDto[] tasks;
	
	private String id;

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }

    private int order;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
}
