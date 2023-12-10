package ensaj.planning.repository;

import ensaj.planning.entities.Classe;
import ensaj.planning.entities.Etudiant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ensaj.planning.entities.Groupe;

import java.util.List;

public interface GroupeRepository extends JpaRepository<Groupe, Long> {

    @Query("select e from Groupe e where e.id = ?1")
    Groupe getGroupeByID(Long Id);

    @Query("select g from Groupe g where g.classe.id = ?1")
    List<Groupe> getGroupeByClasse_Id(Long classId);

    @Query("select g from Groupe g where g.classe in (select m.classe from Module m where m.id = ?1)")
    List<Groupe> getGroupByModule(Long classId);

    @Query("SELECT u FROM Groupe u")
    Page<Groupe> findAall(Pageable pageable);

    @Query("select e from Groupe e where e.libelle LIKE %?1%  or e.classe.libelle LIKE %?1% ")
    Page<Groupe> searchGroup(String keyword, Pageable pageable);
}
