package ensaj.planning.services;

import ensaj.planning.entities.Criteria;

public interface ICriteriaService {
    Criteria save(Criteria criteria);
    Criteria getCriteriaByStud(Long id);
}
