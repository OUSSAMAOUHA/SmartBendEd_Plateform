package ensaj.planning.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ensaj.planning.entities.Enseignant;
import ensaj.planning.entities.Module;

import java.util.List;

public interface ModuleRepository extends JpaRepository<Module, Long> {


    @Query("select m from Module m where m in (select a.module from AffectationModuleGroupeTeacher a where a.groupe.id = ?1)")
    List<Module> getModuleByGroupe(Long idGroup);

    @Query("select m from Module m where m in (select a.module from AffectationModuleGroupeTeacher a where a.enseignant = ?1)")
    List<Module> getModulesByEnseignant(Enseignant enseignant);

    @Query("select m from Module  m where m.classe.id = ?1")
    List<Module> getModulesByClasse(Long id);
}
