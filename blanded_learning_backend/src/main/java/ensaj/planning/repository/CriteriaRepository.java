package ensaj.planning.repository;

import ensaj.planning.entities.Criteria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CriteriaRepository extends JpaRepository<Criteria, Long> {

    @Query("SELECT c from Criteria c WHERE c.etudiant.id = ?1")
    Criteria getCriteriaByEtudiant(Long id);

}
