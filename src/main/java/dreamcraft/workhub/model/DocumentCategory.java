package dreamcraft.workhub.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@Entity
@Table(name = "DocumentCategories")
@JsonIgnoreProperties({"documents"})
public class DocumentCategory {
    @Id @Column(name = "ID") @GeneratedValue(strategy = GenerationType.IDENTITY)
    private short id;

    @Column(name = "Description", nullable = false, unique = true, length = 30)
    private String description;

    @OneToMany(mappedBy = "category") private List<Document> documents;

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
}
