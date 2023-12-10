package ensaj.planning.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ensaj.planning.entities.AffectationModuleGroupeTeacher;
import ensaj.planning.repository.AffectRepository;

@Service
public class IAffectServiceImpl implements IAffect{

    @Autowired
    AffectRepository affectRepository;

    @Override
    public AffectationModuleGroupeTeacher save(AffectationModuleGroupeTeacher affectationModuleGroupeTeacher) {
        return affectRepository.save(affectationModuleGroupeTeacher);
    }
}
