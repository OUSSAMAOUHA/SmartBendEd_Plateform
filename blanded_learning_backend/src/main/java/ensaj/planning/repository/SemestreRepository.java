package ensaj.planning.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ensaj.planning.entities.Semestre;
import ensaj.planning.entities.enums.NumeroSemester;

import java.util.List;

public interface SemestreRepository extends JpaRepository<Semestre, Long> {
    List<Semestre> findSemestreByNum(NumeroSemester numeroSemester);
}
