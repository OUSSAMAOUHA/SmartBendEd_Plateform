package ensaj.planning.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ensaj.planning.entities.Salle;
import ensaj.planning.entities.enums.TypeSalle;

public interface SalleRepository extends JpaRepository<Salle, Long> {
    @Query("SELECT e FROM Salle e WHERE e.typeSalle = ?1")
    Page<Salle> searchWithPagination(TypeSalle keyword, Pageable pageable);
}
