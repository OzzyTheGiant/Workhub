package dreamcraft.workhub.model;

import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Projects")
@JsonIgnoreProperties({"client"})
public class Project {
    @Id @Column(name = "ID") @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "Name", length = 100, nullable = false)
    private String Name;

    @ManyToOne @JoinColumn(name = "ClientID", nullable = false)
    private Client client;

    @ManyToOne @JoinColumn(name = "CategoryID", nullable = false)
    private ProjectCategory category;

    @Column(name = "Year", nullable = false) private short year;

    @Column(name = "DateCreated", nullable = false, columnDefinition = "DATETIME")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateCreated;

    @Column(name = "DateDue", columnDefinition = "DATETIME")
    @Temporal(TemporalType.DATE)
    private Date dateDue;

    @OneToMany(mappedBy = "project") private List<Document> documents; 

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public ProjectCategory getCategory() {
        return category;
    }

    public void setCategory(ProjectCategory category) {
        this.category = category;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Date getDateDue() {
        return dateDue;
    }

    public void setDateDue(Date dateDue) {
        this.dateDue = dateDue;
    }
}
