package dreamcraft.workhub.model;

import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "DocumentAccessRestrictions")
@JsonIgnoreProperties({"document", "employee"})
public class DocumentAccessRestriction {
    @Id @Column(name = "ID") @GeneratedValue(strategy = GenerationType.IDENTITY) private int id;
    @ManyToOne @JoinColumn(name = "DocumentID") private Document document;
    @ManyToOne @JoinColumn(name = "EmployeeID") private Employee employee;

    public Document getDocument() {
        return document;
    }

    public void setDocument(Document document) {
        this.document = document;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}
