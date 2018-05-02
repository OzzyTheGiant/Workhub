package dreamcraft.workhub.model;

import javax.persistence.*;

@Entity
@Table(name = "Employees")
public class Employee {
    @Id @Column(name = "ID") @GeneratedValue(strategy = GenerationType.IDENTITY)
    private short id;

    @Column(name = "Username", length = 20, unique = true, nullable = false)
    private String username;

    @Column(name = "Password", length = 255, nullable = false) private String password;
    @Column(name = "FirstName", length = 20, nullable = false) private String firstName;
    @Column(name = "MiddleName", length = 20) private String middleName;
    @Column(name = "lastName", length = 20, nullable = false) private String lastName;
    @Column(name = "Active", nullable = false, columnDefinition = "TINYINT DEFAULT 1") private boolean isActive;
    @Column(name = "Role", nullable = false, columnDefinition = "VARCHAR(5) DEFAULT 'STAFF'", length = 5)
    private String role;

    public short getId() {
        return id;
    }

    public void setId(short id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
