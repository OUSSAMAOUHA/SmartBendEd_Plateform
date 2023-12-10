package ensaj.planning.web;

import ensaj.planning.entities.CustomEnseignatModuleResult;
import ensaj.planning.entities.Enseignant;
import ensaj.planning.services.IEnseignantService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@CrossOrigin("*")
@RestController
@RequestMapping("/api/enseignants")
@AllArgsConstructor
public class EnseignantController {

    private final IEnseignantService enseignantService;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping
    public Page<Enseignant> getAllEnseignants(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return enseignantService.getEnseignants(pageable);
    }

    @GetMapping("all")
    public List<Enseignant> getAllEnseignantss() {
        return enseignantService.getEnseignantss();
    }

    @GetMapping("/{id}")
    public Enseignant getEnseignantById(@PathVariable Long id) {
        return enseignantService.getEnseignantById(id);
    }

    @PostMapping
    public Enseignant createEnseignant(@RequestBody Enseignant enseignant) {
        return enseignantService.addEnseignant(enseignant);
    }

    @PutMapping("/{id}")
    public Enseignant updateEnseignant(@PathVariable Long id, @RequestBody Enseignant updatedEnseignant) {
        return enseignantService.updateEnseignant(id, updatedEnseignant);
    }

    @DeleteMapping("/{id}")
    public String deleteEnseignant(@PathVariable Long id) {
        return enseignantService.deleteEnseignant(id);
    }
    @GetMapping("/search")
    public Page<Enseignant> searchEnseignants(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return enseignantService.searchEnseignants(keyword, pageable);
    }
    @GetMapping("/customQuery")
    public List<CustomEnseignatModuleResult> getCustomEtudiantCriteria() {
        String sql = "SELECT p.id , p.nom , p.prenom , p.specialite , m.libelle , m.volume_horaire_onsite, m.volume_horaire_on_remote , m.semestre , m.mode  FROM person p JOIN module m ON p.id = m.enseignant_id WHERE p.role = 'PROF'; ";
        List<CustomEnseignatModuleResult> results = jdbcTemplate.query(sql, BeanPropertyRowMapper.newInstance(CustomEnseignatModuleResult.class));

        return results;
    }
}
