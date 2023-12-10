package ensaj.planning.services;

import ensaj.planning.repository.ClasseRepository;
import ensaj.planning.repository.GroupeRepository;
import ensaj.planning.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ensaj.planning.entities.Etudiant;
import ensaj.planning.entities.Groupe;

import java.util.List;

@Service
public class IEtudiantServiceImpl implements IEtudiantService {

    @Autowired
    private UserRepository userRepository;
    private final ClasseRepository classeRepository;

    @Autowired
    private GroupeRepository groupeRepository;

    @Autowired
    public IEtudiantServiceImpl(ClasseRepository classeRepository) {
        this.classeRepository = classeRepository;
    }

    @Override
    public Etudiant save(Etudiant etudiant) {
        return userRepository.save(etudiant);
    }

    @Override
    @Transactional
    public Etudiant addEtudiant(Etudiant etudiant, Long groupeId) {
        Groupe groupe = groupeRepository.findById(groupeId).orElse(null);
        etudiant.setGroupe(groupe);
        return userRepository.save(etudiant);
    }

    @Override
    public List<Etudiant> searchEtudiant(Long idClasse) {
        return userRepository.searchByClasse(idClasse);
    }


    @Override
    public String deleteEtudiant(Long id) {
        try {
            userRepository.getById(id);
            userRepository.deleteById(id);
            return "L'operation est bien effectuée";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @Override
    public Etudiant getEtudById(Long id) {
        return userRepository.getEtudByid(id);
    }

    @Override
    public Page<Etudiant> getEtudiants(Pageable pageable) {
        return  userRepository.findUsersByRoles("Etudiant",pageable);
    }

    @Override
    public List<Etudiant> getEtudiantss() {
        return userRepository.findAllByRoleEtudiant("Etudiant");
    }

    @Override
    public Page<Etudiant> searchEtudiants(String keyword, Pageable pageable) {
        return  userRepository.searchWithPaginationEtudiant(keyword, pageable);
    }

    @Override
    public List<Etudiant> getAllEtudiant() {
        return  userRepository.findAllByRoleEtudiant("Etudiant");
    }

    @Override
    public List<Etudiant> findEtudiantByNom(String nom) {
        return  userRepository.findEnseignantByNomEtudiant(nom);
    }


}
