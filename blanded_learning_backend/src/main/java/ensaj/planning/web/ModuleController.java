package ensaj.planning.web;

import ensaj.planning.entities.Module;
import ensaj.planning.services.IClasseService;
import ensaj.planning.services.IEnseignantService;
import ensaj.planning.services.IFiliereService;
import ensaj.planning.services.IModuleService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/modules")
public class ModuleController {
    private final IModuleService moduleService;
    private final IClasseService iClasseService;
    private final IEnseignantService iEnseignantService;
    private final IFiliereService iFiliereService;



    @GetMapping
    public List<Module> getAllModules() {
        return moduleService.getModules();
    }

    @GetMapping("/modullees")
    public List<Module> getModulesNoTeacher(){
        return moduleService.getModuleByEnseignant(null);
    }

    @GetMapping("/modullees/{id}")
    public List<Module> getModulesNoTeacher(@PathVariable Long id){
        return moduleService.getModuleByEnseignant(iEnseignantService.getEnseignantById(id));
    }

    @GetMapping("/{id}")
    public Module getModuleById(@PathVariable Long id) {
        return moduleService.getModuleById(id);
    }

    @PostMapping
    public Module createModule(@RequestBody Module module, @RequestParam Long classeId, @RequestParam Long filiereId) {
        return moduleService.addModule(module, classeId, filiereId);
    }

    @GetMapping("/classe/{id}")
    public List<Module> getModuleByClasse(@PathVariable Long id) {
        return moduleService.getModuleByClasse(id);
    }



    @PutMapping("/{id}")
    public Module updateModule(@PathVariable Long id, @RequestBody Module updatedModule, @RequestParam Long classeId,@RequestParam Long filiereId) {
        Module existingModule = moduleService.getModuleById(id);

        if (existingModule != null) {
            existingModule.setVolumeHoraireOnsite(updatedModule.getVolumeHoraireOnsite());
            existingModule.setVolumeHoraireOnRemote(updatedModule.getVolumeHoraireOnRemote());
            existingModule.setNbrTD(updatedModule.getNbrTD());
            existingModule.setNbrTP(updatedModule.getNbrTP());
            existingModule.setNbrEvaluation(updatedModule.getNbrEvaluation());
            existingModule.setLibelle(updatedModule.getLibelle());

            existingModule.setClasse(iClasseService.getClasseById(classeId));
            existingModule.setFiliere(iFiliereService.getFiliereById(filiereId));

            return moduleService.updateModule(id,existingModule);
        } else {

            return null;
        }
    }

    @DeleteMapping("/{id}")
    public String deleteModule(@PathVariable Long id) {
        return moduleService.deleteModule(id);
    }
}
