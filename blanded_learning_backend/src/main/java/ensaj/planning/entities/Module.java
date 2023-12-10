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
public class Module {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int volumeHoraireOnsite;
    private int volumeHoraireOnRemote;
    private int nbrTD;
    private int nbrTP;
    private int nbrEvaluation;
    private String libelle;

    @ManyToOne
    private Classe classe;
    @ManyToOne
    private Enseignant enseignant;
    @ManyToOne
    private Filiere filiere;
    private String semestre;

}
