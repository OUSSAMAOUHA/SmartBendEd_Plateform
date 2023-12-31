package ensaj.planning.entities;

import org.optaplanner.core.api.score.buildin.hardsoft.HardSoftScore;
import org.optaplanner.core.api.score.calculator.EasyScoreCalculator;

import java.util.List;

public class TimeTableEasyScoreCalculator implements EasyScoreCalculator<TimeTable, HardSoftScore> {

    @Override
    public HardSoftScore calculateScore(TimeTable timeTable) {
        List<Module> lessonList = timeTable.getModuleList();
        int hardScore = 0;
        for (Module a : lessonList) {
            for (Module b : lessonList) {
                if (a.getTimeslot() != null && a.getTimeslot().equals(b.getTimeslot())
                        && a.getId() < b.getId()) {
                    // A room can accommodate at most one lesson at the same time.
                    if (a.getRoom() != null && a.getRoom().equals(b.getRoom())) {
                        hardScore--;
                    }
                    // A teacher can teach at most one lesson at the same time.
                    if (a.getTeacher().equals(b.getTeacher())) {
                        hardScore--;
                    }
                    // A student can attend at most one lesson at the same time.
                    if (a.getStudentGroup().equals(b.getStudentGroup())) {
                        hardScore--;
                    }
                }
            }
        }
        int softScore = 0;
        // Soft constraints are only implemented in the optaplanner-quickstarts code
        return HardSoftScore.of(hardScore, softScore);
    }

}