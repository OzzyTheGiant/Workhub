package dreamcraft.workhub.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Clients")
public class Client {
    @Id @Column(name = "ID", length = 20) private String id;
    @Column(name = "ClientName", length = 255, nullable = false)
    private String clientName;
    @OneToMany(mappedBy = "client") private List<Project> projects;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }
}
