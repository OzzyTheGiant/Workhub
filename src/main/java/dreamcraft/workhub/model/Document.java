package dreamcraft.workhub.model;

import javax.persistence.*;

@Entity
@Table(name = "Documents")
public class Document {
    @Id @Column(name = "ID") private int id;
    @Column(name = "Description", nullable = false) String description;
    @Column(name = "FilePath", nullable =  false) String filePath;
    @ManyToOne @JoinColumn(name = "ClientID") private Client client;
    @ManyToOne @JoinColumn(name = "ProjectID") private Project project;
    @Column(name = "FileTypeID") @Enumerated(EnumType.ORDINAL) private FileType fileType;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public FileType getFileType() {
        return fileType;
    }

    public void setFileType(FileType fileType) {
        this.fileType = fileType;
    }
}
