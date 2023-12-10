package ensaj.planning.web;

import ensaj.planning.entities.CustomEtudiantCriteriaResult;
import ensaj.planning.services.IEtudiantService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import ensaj.planning.entities.Etudiant;

import java.util.List;

@Slf4j
@CrossOrigin("*")
@RestController
@RequestMapping("/api/etudiant")
public class EtudiantController {

    @Autowired
    IEtudiantService iEtudiantService;
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @GetMapping
    public Page<Etudiant> getAllEtudiants(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return iEtudiantService.getEtudiants(pageable);
    }
    @GetMapping("all")
    public List<Etudiant> getAllEtudiantss() {
        return iEtudiantService.getEtudiantss();
    }

    @GetMapping("etud/{id}")
    public Etudiant getEtudiantById(@PathVariable Long id) {
        return iEtudiantService.getEtudById(id);
    }


    @PostMapping
    public Etudiant createEtudiant(@RequestBody Etudiant etudiant,@RequestParam Long classeId) {
        return iEtudiantService.addEtudiant(etudiant,classeId);
    }

    @PostMapping("/save")
    public Etudiant createEtudiant1(@RequestBody Etudiant etudiant) {
        return iEtudiantService.save(etudiant);
    }

    @GetMapping("/{id}")
    public List<Etudiant> getEtudByclass(@PathVariable Long id) {
        return iEtudiantService.searchEtudiant(id);
    }


    @DeleteMapping("/{id}")
    public String deleteEnseignant(@PathVariable Long id) {
        return iEtudiantService.deleteEtudiant(id);
    }

    @GetMapping("/search")
    public Page<Etudiant> searchEtudiants(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return iEtudiantService.searchEtudiants(keyword, pageable);
    }
    @GetMapping("/customQuery")
    public List<CustomEtudiantCriteriaResult> getCustomEtudiantCriteria() {
        String sql = "SELECT p.id, p.civilite, p.cne, p.email, p.login, p.nom, p.password, p.prenom, p.tel, p.classe_id, c.id AS criteria_id, c.preference, c.equipment, c.learning_space, c.infrastructure FROM person p LEFT JOIN criteria c ON p.id = c.etudiant_id WHERE p.role = 'Etudiant';";
        List<CustomEtudiantCriteriaResult> results = jdbcTemplate.query(sql, BeanPropertyRowMapper.newInstance(CustomEtudiantCriteriaResult.class));

        // Transform the values before returning the result
        results.forEach(CustomEtudiantCriteriaResult::transformValues);

        return results;
    }
}
