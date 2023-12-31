package ensaj.planning.repository;

import ensaj.planning.entities.Classe;
import ensaj.planning.entities.TimeSlotClasse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface TimeSlotClasseRepository extends JpaRepository<TimeSlotClasse, Long> {

    @Query("SELECT t from TimeSlotClasse t where t.module.classe.id = ?1")
    List<TimeSlotClasse> getTimeSlotClasseByclasse(Long id);


    @Query("SELECT t from TimeSlotClasse t where t.module.enseignant.id = ?1")
    List<TimeSlotClasse> getTimeSlotClasseByEnseignant(Long id);

    @Modifying
    @Transactional
    @Query(value = "TRUNCATE TABLE timeslot_module_salle", nativeQuery = true)
    void delete();

    List<TimeSlotClasse> findByModule_Id(Long moduleId);

}

