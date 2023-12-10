package ensaj.planning.services;

import ensaj.planning.entities.Criteria;
import ensaj.planning.repository.CriteriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ICriteriaServiceImpl implements ICriteriaService{

    @Autowired
    CriteriaRepository criteriaRepository;

    @Override
    public Criteria save(Criteria criteria) {
        return criteriaRepository.save(criteria);
    }

    @Override
    public Criteria getCriteriaByStud(Long id) {
        return criteriaRepository.getCriteriaByEtudiant(id);
    }
}
