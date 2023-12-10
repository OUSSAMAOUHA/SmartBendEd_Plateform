package ensaj.planning.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.Collection;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("PROF")
public class Enseignant extends Person {
    private String specialite;


}
