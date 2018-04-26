package dreamcraft.workhub.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Documents")
public class Document {
    @Id @Column(name = "ID") private String id;
    @Column(name = "Description", nullable = false) String description;
    @Column(name = "Year", nullable = false) private short year;
    @Column(name = "FilePath", nullable =  false) String filePath;
    @ManyToOne @JoinColumn(name = "ClientID") private Client client;
    @ManyToOne @JoinColumn(name = "ProjectID") private Project project;
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

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
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
