package ensaj.planning.services;

import ensaj.planning.entities.*;
import ensaj.planning.entities.Module;
import ensaj.planning.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class IModuleServiceImpl implements IModuleService {
    private ModuleRepository moduleRepository;
    private ClasseRepository classeRepository;
    private FiliereRepository filiereRepository;
    private UserRepository userRepository;
    private CriteriaRepository criteriaRepository;




    @Override
    public List<Module> getModules() {
        return moduleRepository.findAll();
    }

    @Override
    public List<Module> getModuleByClasse(Long id) {
        return moduleRepository.getModulesByClasse(id);
    }


    @Override
    public Page<Module> getModulesS(Pageable pageable) {
        return moduleRepository.findAll(pageable);
    }

    //reda type module
    @Override
    public String getTypeModule(Long id,Long idGroup) {
        Module module=moduleRepository.getbyId(id);
        List<Etudiant> etudiants = userRepository.findAllByGroupe(idGroup);
        boolean b = false;
        for(Etudiant e:etudiants){
            System.out.println(e.getId());
            Criteria c =criteriaRepository.getCriteriaByEtudiant(e.getId());
            if(c.getEquipment().equals("Yes") && c.getInfrastructure().equals("Yes") && c.getLearningSpace().equals("Yes") && c.getPreference().equals("Hybride")){
                b = true;
            }else{
                b = false;
                break;
            }
        }

        if(module.getVolumeHoraireOnRemote() == 0){
            b= false;
        }else {
            b = true;
        }
        if (b){
            return "Hybrid";
        }
        return "On site";
    }

    @Override
    public Module addModule(Module module, Long classeId,Long filiereId) {
        Classe classe= classeRepository.findById(classeId).orElse(null);
        Filiere filiere = filiereRepository.findById(filiereId).orElse(null);
        module.setClasse(classe);
        module.setFiliere(filiere);

        return moduleRepository.save(module);
    }

    @Override
    public Module saveModule(Module module) {
        return moduleRepository.save(module);
    }



    @Override
    public Module getModuleById(Long id) {

        return moduleRepository.findById(id).orElseThrow(() -> new RuntimeException("Ce module n'existe pas."));
    }

    @Override
    public Module updateModule(Long id, Module module) {

        module.setId(id);
        return moduleRepository.save(module);
    }

    @Override
    public List<Module> getModuleByEnseignant(Enseignant enseignant) {
        return moduleRepository.getModulesByEnseignant2(enseignant);
    }

    private TimeSlotClasseRepository timeSlotClasseRepository;
    private SessionRepository sessionRepository;


    @Override
    public Page<Module> searchModule(String keyword,  Pageable pageable) {
        return moduleRepository.searchModule(keyword, pageable);
    }

    @Override
    public String deleteModule(Long id) {
        try {
            Module moduleToDelete = moduleRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Ce module n'existe pas."));

            // Fetch TimeSlotClasse entities related to the Module
            List<TimeSlotClasse> timeSlotClasseList = timeSlotClasseRepository.findByModule_Id(id);

            // Remove the association from each TimeSlotClasse entity
            for (TimeSlotClasse timeSlotClasse : timeSlotClasseList) {
                timeSlotClasse.setModule(null);
                // Optionally, you might want to delete these entities if necessary
                timeSlotClasseRepository.delete(timeSlotClasse);
            }

            // Fetch Session entities related to the Module
            List<Session> sessionsRelatedToModule = sessionRepository.findByModule_Id(id);

            // Handle sessions related to the Module
            for (Session session : sessionsRelatedToModule) {
                // Remove or update the association in the Session entity
                session.setModule(null); // Or update the reference to another Module if required
                // Optionally, you might want to delete these sessions if necessary
                sessionRepository.delete(session);
            }

            // Delete the Module
            moduleRepository.delete(moduleToDelete);
            return "L'opération est bien effectuée";
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}
