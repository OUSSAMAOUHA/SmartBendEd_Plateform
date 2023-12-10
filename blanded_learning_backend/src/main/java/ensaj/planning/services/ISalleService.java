package ensaj.planning.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import ensaj.planning.entities.Salle;
import ensaj.planning.entities.enums.TypeSalle;

import java.util.List;

public interface ISalleService {
    List<Salle> getSalles();

    Salle addSalle(Salle salle);

    String deleteSalle(Long id);

    Salle getSalleById(Long id);

    Salle updateSalle(Long id, Salle salle);


    Page<Salle> searchSalles(TypeSalle keyword, Pageable pageable);
    Page<Salle> getSalles(Pageable pageable);
}
