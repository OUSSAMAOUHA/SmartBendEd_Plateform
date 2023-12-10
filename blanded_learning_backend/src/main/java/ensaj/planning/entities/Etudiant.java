package ensaj.planning.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("Etudiant")
public class Etudiant extends Person{

    @ManyToOne
    private Classe classe ;
    @ManyToOne
    private Groupe groupe ;
}
