package ensaj.planning.web;

import ensaj.planning.entities.Enseignant;
import ensaj.planning.entities.Module;
import ensaj.planning.services.IClasseService;
import ensaj.planning.services.IEnseignantService;
import ensaj.planning.services.IFiliereService;
import ensaj.planning.services.IModuleService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    @GetMapping("/pagination")
    public Page<Module> getAllModulesS(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return moduleService.getModulesS(pageable);
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
        // Check the volumes to determine the mode
        if (module.getVolumeHoraireOnsite() == 0) {
            module.setMode("Remote");
        } else if (module.getVolumeHoraireOnRemote() == 0) {
            module.setMode("On Site");
        } else {
            module.setMode("Hybride");
        }

        return moduleService.addModule(module, classeId, filiereId);
    }

    @PostMapping("/save")
    public Module saveModule(@RequestBody Module module) {
        // Check the volumes to determine the mode
        if (module.getVolumeHoraireOnsite() == 0) {
            module.setMode("Remote");
        } else if (module.getVolumeHoraireOnRemote() == 0) {
            module.setMode("On site");
        } else {
            module.setMode("Hybride");
        }

        return moduleService.saveModule(module);
    }

    @GetMapping("/classe/{id}")
    public List<Module> getModuleByClasse(@PathVariable Long id) {
        return moduleService.getModuleByClasse(id);
    }

    //redaaaa type module
//    @GetMapping("/type")
//    public String getEtuds(@RequestParam(name = "id") Long param1,
//                           @RequestParam(name = "idg") Long param2){
//        System.out.println(moduleService.getTypeModule(param1,param2));
//        return null;
//    }

    @GetMapping("/search")
    public Page<Module> searchModules(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return moduleService.searchModule(keyword, pageable);
    }


    @PutMapping("/{id}")
    public Module updateModule(@PathVariable Long id, @RequestBody Module updatedModule, @RequestParam Long classeId, @RequestParam Long filiereId) {
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

            // Check and update the mode based on volume hours
            if (existingModule.getVolumeHoraireOnsite() == 0) {
                existingModule.setMode("Remote");
            } else if (existingModule.getVolumeHoraireOnRemote() == 0) {
                existingModule.setMode("On site");
            } else {
                existingModule.setMode("Hybride");
            }

            return moduleService.updateModule(id, existingModule);
        } else {
            return null;
        }
    }

    @DeleteMapping("/{id}")
    public String deleteModule(@PathVariable Long id) {
        return moduleService.deleteModule(id);
    }
}
