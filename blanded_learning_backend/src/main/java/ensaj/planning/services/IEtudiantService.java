package ensaj.planning.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import ensaj.planning.entities.Etudiant;

import java.util.List;

public interface IEtudiantService {

    Etudiant save(Etudiant etudiant);
    Etudiant addEtudiant(Etudiant etudiant, Long classeId);

    List<Etudiant> searchEtudiant(Long idClasse);

    String deleteEtudiant(Long id);

    Etudiant getEtudById(Long id);
    Page<Etudiant> getEtudiants(Pageable pageable);

    List<Etudiant> getEtudiantss();

    Page<Etudiant> searchEtudiants(String keyword, Pageable pageable);

    List<Etudiant> getAllEtudiant();

    List<Etudiant> findEtudiantByNom(String nom);
}
