package ensaj.planning.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import ensaj.planning.entities.enums.NumeroSemester;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Semestre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Temporal(TemporalType.DATE)
    private Date dateDebut;
    @Temporal(TemporalType.DATE)
    private Date dateFin;
    @Enumerated(EnumType.STRING)
    private NumeroSemester num;
    private String anneeUniv;//2022-2023
    @OneToMany(mappedBy = "semestre")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Collection<Classe> classes = new ArrayList<>();

}
