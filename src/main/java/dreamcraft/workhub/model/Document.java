package dreamcraft.workhub.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Documents")
public class Document {
    @Id @Column(name = "ID") private String id;
    @Column(name = "Description", nullable = false) String description;
    @Column(name = "Year", nullable = false) private short year;
    @Column(name = "AccessLevel", nullable = false, columnDefinition = "TINYINT DEFAULT 0") @Enumerated(EnumType.ORDINAL)
    private AccessLevel accessLevel;
    @ManyToOne @JoinColumn(name = "ClientID") private Client client;
    @ManyToOne @JoinColumn(name = "ProjectID") private Project project;
    @ManyToOne @JoinColumn(name = "CategoryID") private DocumentCategory category;
    @OneToMany(mappedBy = "document") private List<DocumentAction> action;
    @Column(name = "FileTypeID") @Enumerated(EnumType.ORDINAL) private FileType fileType;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public short getYear() {
        return year;
    }

    public void setYear(short year) {
        this.year = year;
    }

    public AccessLevel getAccessLevel() {
        return accessLevel;
    }

    public void setAccessLevel(AccessLevel accessLevel) {
        this.accessLevel = accessLevel;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public DocumentCategory getCategory() {
        return category;
    }

    public void setCategory(DocumentCategory category) {
        this.category = category;
    }

    public List<DocumentAction> getAction() {
        return action;
    }

    public void setAction(List<DocumentAction> action) {
        this.action = action;
    }

    public FileType getFileType() {
        return fileType;
    }

    public void setFileType(FileType fileType) {
        this.fileType = fileType;
    }
}
