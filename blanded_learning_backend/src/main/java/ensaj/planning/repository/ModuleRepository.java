package ensaj.planning.repository;

import ensaj.planning.entities.Groupe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Query("select m from Module m where m.id = ?1 ")
    Module getbyId(Long id);

    @Query("select e from Module e where e.libelle LIKE %?1%  or e.classe.libelle LIKE %?1% ")
    Page<Module> searchModule(String keyword, Pageable pageable);
}
