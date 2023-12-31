package ensaj.planning.services;

import ensaj.planning.entities.AffectationModuleGroupeTeacher;
import ensaj.planning.entities.Session;

import java.util.List;

public interface ISession {
    Session save(Session session);
    List<Session> getByStudent(Long id);
}
