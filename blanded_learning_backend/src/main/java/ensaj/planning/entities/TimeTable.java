package ensaj.planning.entities;

import java.util.List;

import org.optaplanner.core.api.domain.solution.PlanningEntityCollectionProperty;
import org.optaplanner.core.api.domain.solution.PlanningScore;
import org.optaplanner.core.api.domain.solution.PlanningSolution;
import org.optaplanner.core.api.domain.solution.ProblemFactCollectionProperty;
import org.optaplanner.core.api.domain.valuerange.ValueRangeProvider;
import org.optaplanner.core.api.score.buildin.hardsoft.HardSoftScore;

@PlanningSolution
public class TimeTable {

    @ValueRangeProvider
    @ProblemFactCollectionProperty
    private List<Timeslot> timeslotList;
    @ValueRangeProvider
    @ProblemFactCollectionProperty
    private List<Salle> salleList;
    @PlanningEntityCollectionProperty
    private List<Module> moduleList;

    @PlanningScore
    private HardSoftScore score;

    public TimeTable() {
    }

    public TimeTable(List<Timeslot> timeslotList, List<Salle> salleList, List<Module> moduleList) {
        this.timeslotList = timeslotList;
        this.salleList = salleList;
        this.moduleList = moduleList;
    }

    public List<Timeslot> getTimeslotList() {
        return timeslotList;
    }

    public List<Salle> getSalleList() {
        return salleList;
    }

    public List<Module> getModuleList() {
        return moduleList;
    }

    public HardSoftScore getScore() {
        return score;
    }

}