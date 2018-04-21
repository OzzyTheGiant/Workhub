package dreamcraft.workhub.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "DocumentHistory")
public class DocumentAction {
    @Id @Column(name = "ID") @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "Action", nullable = false) @Enumerated(EnumType.ORDINAL)
    private DocumentActionType action;

    @Column(name = "ActionDate", nullable = false, columnDefinition = "DATETIME")
    @Temporal(TemporalType.TIMESTAMP)
    private Date actionDate;

    @ManyToOne @JoinColumn(name = "ActionUser") private Employee employee;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public DocumentActionType getAction() {
        return action;
    }

    public void setAction(DocumentActionType action) {
        this.action = action;
    }

    public Date getActionDate() {
        return actionDate;
    }

    public void setActionDate(Date actionDate) {
        this.actionDate = actionDate;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}
