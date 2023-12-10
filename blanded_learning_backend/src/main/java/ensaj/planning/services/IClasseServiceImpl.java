package ensaj.planning.services;

import ensaj.planning.entities.Groupe;
import ensaj.planning.entities.Module;
import ensaj.planning.repository.ClasseRepository;
import ensaj.planning.repository.FiliereRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ensaj.planning.entities.Classe;
import ensaj.planning.entities.Filiere;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class IClasseServiceImpl implements IClasseService {
    private ClasseRepository classeRepository;
    private FiliereRepository filiereRepository;

    @Override
    public List<Classe> getClasses() {
        return classeRepository.findAll();
    }

    @Override
    public Classe addClasse(Classe classe, Long idFielre) {
        Filiere filiere = filiereRepository.findById(idFielre).orElseThrow(() -> new RuntimeException("La filiere avec id=" + idFielre + " n'existe pas!"));
        classe.setFiliere(filiere);
        return classeRepository.save(classe);
    }



    @Override
    public String deleteClasse(Long id) {
        try {
            getClasseById(id);
            classeRepository.deleteById(id);
            return "La suppression de classe est bien effectuée";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public Classe getClasseById(Long id) {
        return classeRepository.findById(id).orElseThrow(() -> new RuntimeException("La classe n'existe pas!"));
    }

    @Override
    public Classe updateClasse(Long id, Classe updatedClasse) {
        // Check if the class with the given ID exists
        Classe existingClasse = classeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("La classe avec l'ID " + id + " n'existe pas"));

        // Update the fields of the existing class with the data from updatedClasse
        existingClasse.setLibelle(updatedClasse.getLibelle());
        existingClasse.setNbrEleves(updatedClasse.getNbrEleves());

        // Ensure that the filiere is correctly set (assuming that filiere is a required field)
        existingClasse.setFiliere(updatedClasse.getFiliere());

        // Save the updated class entity
        return classeRepository.save(existingClasse);
    }


    @Override
    public Page<Classe> getClasses(Pageable pageable) {
        return classeRepository.findAll(pageable);
    }

    @Override
    public Page<Classe> searchClasses(String keyword, Long sem,Pageable pageable) {
        return classeRepository.searchClasses(keyword, sem, pageable);
    }

    @Override
    public List<Classe> getClasseByFiliere(Long id) {
        return classeRepository.getClasseByFiliere(id);
    }

    @Override
    public Page<Classe> searchClasses(String keyword,Pageable pageable) {
        return classeRepository.searchClasses(keyword, pageable);
    }

}
