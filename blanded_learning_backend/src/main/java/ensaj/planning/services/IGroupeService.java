package ensaj.planning.services;

import ensaj.planning.entities.Classe;
import ensaj.planning.entities.Groupe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IGroupeService {
    Groupe save(Groupe groupe);

    List<Groupe> getGroupByclasse(Long id);

    List<Groupe> getGroupByModule(Long id);


    Page<Groupe> getGroups(Pageable pageable);

    Page<Groupe> searchGroup(String keyword, Pageable pageable);

    String deleteGroupe(Long id);
}
