package ensaj.planning.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ensaj.planning.entities.AffectationModuleGroupeTeacher;

public interface AffectRepository extends JpaRepository<AffectationModuleGroupeTeacher, Long> {
}
