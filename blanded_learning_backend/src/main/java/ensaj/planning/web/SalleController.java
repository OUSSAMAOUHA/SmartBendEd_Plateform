package ensaj.planning.web;

import ensaj.planning.entities.Salle;
import ensaj.planning.entities.enums.TypeSalle;
import ensaj.planning.services.ISalleService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@Slf4j
@CrossOrigin("*")
@RestController
@RequestMapping("/api/salles")
@AllArgsConstructor
public class SalleController {

    private final ISalleService salleService;


    @GetMapping
    public Page<Salle> getAllSalles(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return salleService.getSalles(pageable);
    }
    @GetMapping("/{id}")
    public Salle getSalleById(@PathVariable Long id) {
        return salleService.getSalleById(id);
    }

    @PostMapping
    public Salle createSalle(@RequestBody Salle salle) {
        return salleService.addSalle(salle);
    }

    @PutMapping("/{id}")
    public Salle updateSalle(@PathVariable Long id, @RequestBody Salle updatedSalle) {
        return salleService.updateSalle(id, updatedSalle);
    }

    @DeleteMapping("/{id}")
    public String deleteSalle(@PathVariable Long id) {
        System.out.println("deleteSalle"+id);
        return salleService.deleteSalle(id);
    }

    @GetMapping("/search")
    public Page<Salle> searchSalles(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        System.out.println("*"+keyword+"*");
        if(keyword.equals("")) return getAllSalles(page, size);
        TypeSalle typeSalle = TypeSalle.valueOf(keyword);
        Pageable pageable = PageRequest.of(page, size);
        return salleService.searchSalles(typeSalle, pageable);
    }
}
