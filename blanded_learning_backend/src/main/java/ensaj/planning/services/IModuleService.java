package ensaj.planning.services;

import ensaj.planning.entities.Enseignant;
import ensaj.planning.entities.Filiere;
import ensaj.planning.entities.Groupe;
import ensaj.planning.entities.Module;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IModuleService {
    List<Module> getModules();

    List<Module> getModuleByClasse(Long id);

    Page<Module> getModulesS(Pageable pageable);


    //reda type module
    String getTypeModule(Long id, Long idGroupe);

    Module addModule(Module module,Long classeId,Long filiereId);
    Module saveModule(Module module);

    String deleteModule(Long id);

    Module getModuleById(Long id);

    Module updateModule(Long id, Module module);

    List<Module> getModuleByEnseignant(Enseignant enseignant);
    Page<Module> searchModule(String keyword, Pageable pageable);
}
