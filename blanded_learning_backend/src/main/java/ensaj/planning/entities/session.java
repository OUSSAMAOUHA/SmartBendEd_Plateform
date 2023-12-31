package ensaj.planning.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Etudiant etudiant;
    @ManyToOne
    private Module module;
    @ManyToOne
    private Enseignant enseignant;
    private String mode;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
