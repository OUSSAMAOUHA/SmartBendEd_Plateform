package ensaj.planning.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ensaj.planning.entities.enums.TypeAdmin;

import java.util.ArrayList;
import java.util.Collection;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("ADMIN")
public class Admin extends Person {
    @Enumerated(EnumType.STRING)
    private TypeAdmin admin_type;


}
