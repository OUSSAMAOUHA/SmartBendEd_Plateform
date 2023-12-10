package ensaj.planning.web;

import ensaj.planning.entities.Classe;
import ensaj.planning.entities.Etudiant;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import ensaj.planning.entities.Groupe;
import ensaj.planning.services.IGroupeService;

import java.util.List;

@Slf4j
@CrossOrigin("*")
@RestController
@RequestMapping("/api/groupes")
@AllArgsConstructor
public class GroupeController {
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private IGroupeService iGroupeService;
    @PostMapping
    public Groupe createGroupe(@RequestBody Groupe groupe) {
        System.out.println(groupe);

        // Retrieve the Classe entity from the database
        Long classeId = groupe.getClasse().getId();
        System.out.println(classeId);

        if (classeId == null) {
            // Handle the situation where the Classe ID is null
            // or throw an exception, depending on your requirements.
        }

        Classe existingClasse = entityManager.find(Classe.class, classeId);

        // Make sure the Classe entity is in the persistent state
        if (existingClasse == null) {
            // Handle the situation where the Classe entity doesn't exist
            // or throw an exception, depending on your requirements.
        }

        // Set the persistent Classe entity to the Groupe
        groupe.setClasse(existingClasse);

        return iGroupeService.save(groupe);
    }



    @GetMapping("/{id}")
    public List<Groupe> getGroupsByclasse(@PathVariable Long id){
        return iGroupeService.getGroupByclasse(id);
    }

    @GetMapping("/module/{id}")
    public List<Groupe> getGroupsByModule(@PathVariable Long id){
        return iGroupeService.getGroupByModule(id);
    }

    @GetMapping
    public Page<Groupe> getAllGroups(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return iGroupeService.getGroups(pageable);
    }


    @GetMapping("/search")
    public Page<Groupe> searchGroup(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return iGroupeService.searchGroup(keyword, pageable);
    }

    @DeleteMapping("/{id}")
    public String deleteGroupe(@PathVariable Long id) {
        return iGroupeService.deleteGroupe(id);
    }

}
