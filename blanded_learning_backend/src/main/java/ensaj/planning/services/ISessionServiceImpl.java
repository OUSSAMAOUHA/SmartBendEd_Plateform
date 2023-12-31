package ensaj.planning.services;

import ensaj.planning.entities.AffectationModuleGroupeTeacher;
import ensaj.planning.entities.Session;
import ensaj.planning.repository.AffectRepository;
import ensaj.planning.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ISessionServiceImpl implements ISession{

    @Autowired
    SessionRepository sessionRepository;

    @Override
    public Session save(Session session) {
        return sessionRepository.save(session);
    }

    @Override
    public List<Session> getByStudent(Long id) {
        return sessionRepository.getSessionsByStudent(id);
    }


}
