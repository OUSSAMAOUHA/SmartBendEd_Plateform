package ensaj.planning.entities;

import jakarta.persistence.*;
import lombok.*;
import ensaj.planning.entities.enums.TypeSalle;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Salle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String bloc;
    private int numSalle;
    private int capacite;
    @Enumerated(EnumType.STRING)
    private TypeSalle typeSalle;

}
