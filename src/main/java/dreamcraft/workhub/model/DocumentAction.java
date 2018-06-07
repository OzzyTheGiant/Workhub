package dreamcraft.workhub.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Date;

@Entity
@Table(name = "DocumentHistory")
@JsonIgnoreProperties({"document"})
public class DocumentAction {
    @Id @Column(name = "ID") @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "Action", nullable = false) @Enumerated(EnumType.ORDINAL)
    private DocumentActionType actionType;

    @ManyToOne @JoinColumn(name = "DocumentID", nullable = false)
    private Document document;

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

    public DocumentActionType getActionType() {
        return actionType;
    }

    public void setActionType(DocumentActionType actionType) {
        this.actionType = actionType;
    }

    public Document getDocument() {
        return document;
    }

    public void setDocument(Document document) {
        this.document = document;
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
