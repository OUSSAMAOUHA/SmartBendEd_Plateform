package ensaj.planning.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.optaplanner.core.api.domain.entity.PlanningEntity;
import org.optaplanner.core.api.domain.lookup.PlanningId;
import org.optaplanner.core.api.domain.variable.PlanningVariable;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@PlanningEntity

public class Module {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @PlanningId
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
    private boolean edited;
    private String mode;


    @Transient
    @PlanningVariable
    private Timeslot timeslot;
    @Transient
    @PlanningVariable
    private Salle room;

    public Timeslot getTimeslot() {
        return timeslot;
    }

    public void setTimeslot(Timeslot timeslot) {
        this.timeslot = timeslot;
    }

    public Salle getSalle() {
        return room;
    }

    public void setSalle(Salle room) {
        this.room = room;
    }

    @Override
    public String toString() {
        return libelle + "(" + id + ")";
    }

    public String getSubject() {
        return libelle;
    }

    public String getTeacher() {
        return "Lprof";
    }

    public String getStudentGroup() {
        return "grp dyalo";
    }

}
