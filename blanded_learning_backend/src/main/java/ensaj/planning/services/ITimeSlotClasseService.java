package ensaj.planning.services;

import ensaj.planning.entities.Classe;
import ensaj.planning.entities.TimeSlotClasse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ITimeSlotClasseService {
    List<TimeSlotClasse> getTimeSlots(Long id);

    List<TimeSlotClasse> getTimeSlotsbyprof(Long id);

    TimeSlotClasse addTimeSlotClasse(TimeSlotClasse timeSlotClasse);

}
