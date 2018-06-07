package dreamcraft.workhub.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.Collection;
import java.util.List;

@Entity(name = "user")
@Table(name = "Employees")
@JsonIgnoreProperties({"username", "password", "documentHistory", "accountNonExpired", "accountNonLocked", "active", "authorities", "credentialsNonExpired", "enabled"})
public class Employee implements UserDetails {
    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();
    public static final long serialVersionUID = 1L;

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
    @OneToMany(mappedBy = "employee") private List<DocumentAction> documentHistory;

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
        this.password = PASSWORD_ENCODER.encode(password);
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

    public List<DocumentAction> getDocumentHistory() {
        return documentHistory;
    }

    public void setDocumentHistory(List<DocumentAction> documentHistory) {
        this.documentHistory = documentHistory;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return AuthorityUtils.createAuthorityList(role);
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isActive;
    }
}
