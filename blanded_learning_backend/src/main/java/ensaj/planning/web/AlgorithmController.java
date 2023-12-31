package ensaj.planning.web;

import ensaj.planning.algorithm.Algorithm;
import ensaj.planning.entities.CustomEnseignatModuleResult;
import ensaj.planning.entities.CustomEtudiantCriteriaResult;
import ensaj.planning.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AlgorithmController {

    private final Algorithm algorithm;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    SessionRepository sessionRepository;

    public AlgorithmController(Algorithm algorithm, JdbcTemplate jdbcTemplate) {
        this.algorithm = algorithm;
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("/runAlgorithm")
    public void runAlgorithm() {
        sessionRepository.delete();
        // Fetch professors and students from the database
        List<CustomEnseignatModuleResult> professors = fetchProfessors();
        List<CustomEtudiantCriteriaResult> students = fetchStudents();

        // Call your algorithm for each professor-student pair
        for (CustomEnseignatModuleResult professor : professors) {
            System.out.println(professor);
            for (CustomEtudiantCriteriaResult student : students) {
                System.out.println(student);
                algorithm.checkConstraints(professor, student);
            }
        }
    }

    // Implement these methods to fetch data from your database
    private List<CustomEnseignatModuleResult> fetchProfessors() {
        String sql = "SELECT p.id , p.nom , p.prenom , p.specialite , m.libelle , m.volume_horaire_onsite, m.volume_horaire_on_remote , m.semestre , m.mode  FROM person p JOIN module m ON p.id = m.enseignant_id WHERE p.role = 'PROF'; ";
        return jdbcTemplate.query(sql, BeanPropertyRowMapper.newInstance(CustomEnseignatModuleResult.class));
    }

    private List<CustomEtudiantCriteriaResult> fetchStudents() {
        String sql = "SELECT p.id, p.civilite, p.cne, p.email, p.login, p.nom, p.password, p.prenom, p.tel, p.classe_id, c.id AS criteria_id, c.preference, c.equipment, c.learning_space, c.infrastructure FROM person p LEFT JOIN criteria c ON p.id = c.etudiant_id WHERE p.role = 'Etudiant';";
        List<CustomEtudiantCriteriaResult> results = jdbcTemplate.query(sql, BeanPropertyRowMapper.newInstance(CustomEtudiantCriteriaResult.class));

        // Transform the values before returning the result
        results.forEach(CustomEtudiantCriteriaResult::transformValues);

        return results;
    }
}
