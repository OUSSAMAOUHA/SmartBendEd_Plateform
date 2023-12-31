package ensaj.planning.services;

import ensaj.planning.entities.Classe;
import ensaj.planning.entities.Filiere;
import ensaj.planning.entities.TimeSlotClasse;
import ensaj.planning.repository.ClasseRepository;
import ensaj.planning.repository.FiliereRepository;
import ensaj.planning.repository.TimeSlotClasseRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ITimeSlotClasseServiceImpl implements ITimeSlotClasseService {
    private TimeSlotClasseRepository timeSlotClasseRepository;


    @Override
    public List<TimeSlotClasse> getTimeSlots(Long id) {
        return timeSlotClasseRepository.getTimeSlotClasseByclasse(id);
    }

    @Override
    public List<TimeSlotClasse> getTimeSlotsbyprof(Long id) {
        return timeSlotClasseRepository.getTimeSlotClasseByEnseignant(id);
    }

    @Override
    public TimeSlotClasse addTimeSlotClasse(TimeSlotClasse timeSlotClasse) {
        return timeSlotClasseRepository.save(timeSlotClasse);
    }
}
