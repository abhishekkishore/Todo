package todo.dto;

import java.util.ArrayList;
import java.util.List;

public class ProjectDtoList {
	public List<ProjectDto> getMembers() {
		return members;
	}

	public void setMembers(List<ProjectDto> members) {
		this.members = members;
	}

	private List<ProjectDto> members = new ArrayList<ProjectDto>();
}
