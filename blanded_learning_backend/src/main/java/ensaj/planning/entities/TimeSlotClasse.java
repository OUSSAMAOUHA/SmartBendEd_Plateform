package ensaj.planning.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "timeslot_module_salle")
public class TimeSlotClasse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String day;
    private String startTime;
    private String endTime;
    @ManyToOne
    @JoinColumn(name = "module_id")
    private Module module;

    private String color;

    private String salle;


}