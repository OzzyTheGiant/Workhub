package dreamcraft.workhub.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "ProjectCategories")
public class ProjectCategory {
    @Id @Column(name = "ID") private short id;
    @Column(name = "Description", length = 30) private String description;
    @OneToMany(mappedBy = "category") private List<Project> projects;

    public short getId() {
        return id;
    }

    public void setId(short id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Project> getProjects() {
        return projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }
}
