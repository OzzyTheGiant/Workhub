package dreamcraft.workhub.model;

import javax.persistence.*;

@Entity
@Table(name = "Projects")
public class Project {
    @Id @Column(name = "ID") @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "Name", length = 100, nullable = false)
    private String Name;

    @ManyToOne @JoinColumn(name = "ClientID", nullable = false)
    private Client client;

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
}
