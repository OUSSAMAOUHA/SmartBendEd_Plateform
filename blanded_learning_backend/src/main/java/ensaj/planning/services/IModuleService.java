package ensaj.planning.services;

import ensaj.planning.entities.Enseignant;
import ensaj.planning.entities.Module;

import java.util.List;

public interface IModuleService {
    List<Module> getModules();

    List<Module> getModuleByClasse(Long id);

    Module addModule(Module module,Long classeId,Long filiereId);

    String deleteModule(Long id);

    Module getModuleById(Long id);

    Module updateModule(Long id, Module module);

    List<Module> getModuleByEnseignant(Enseignant enseignant);
}
