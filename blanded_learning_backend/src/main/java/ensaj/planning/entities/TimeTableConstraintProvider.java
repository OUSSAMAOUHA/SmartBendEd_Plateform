package ensaj.planning.entities;

import org.optaplanner.core.api.score.buildin.hardsoft.HardSoftScore;
import org.optaplanner.core.api.score.stream.Constraint;
import org.optaplanner.core.api.score.stream.ConstraintFactory;
import org.optaplanner.core.api.score.stream.ConstraintProvider;
import org.optaplanner.core.api.score.stream.Joiners;

import java.time.DayOfWeek;
import java.time.Duration;

public class TimeTableConstraintProvider implements ConstraintProvider {

    @Override
    public Constraint[] defineConstraints(ConstraintFactory constraintFactory) {
        return new Constraint[] {
                // Hard constraints
                salleConflict(constraintFactory),
                teacherConflict(constraintFactory),
                studentGroupConflict(constraintFactory),
                //adjacentModule(constraintFactory),

                // Soft constraints are only implemented in the optaplanner-quickstarts code

                teacherSalleStability(constraintFactory),
                teacherTimeEfficiency(constraintFactory),
                studentTimeDistribution(constraintFactory),



        };
    }

    private Constraint salleConflict(ConstraintFactory constraintFactory) {
        // A salle can accommodate at most one module at the same time.

        // Select a module ...
        return constraintFactory
                .forEach(Module.class)
                // ... and pair it with another module ...
                .join(Module.class,
                        // ... in the same timeslot ...
                        Joiners.equal(Module::getTimeslot),
                        // ... in the same salle ...
                        Joiners.equal(Module::getSalle),
                        // ... and the pair is unique (different id, no reverse pairs) ...
                        Joiners.lessThan(Module::getId))
                // ... then penalize each pair with a hard weight.
                .penalize(HardSoftScore.ONE_HARD)
                .asConstraint("Salle conflict");
    }

    private Constraint teacherConflict(ConstraintFactory constraintFactory) {
        // A teacher can teach at most one module at the same time.
        return constraintFactory.forEach(Module.class)
                .join(Module.class,
                        Joiners.equal(Module::getTimeslot),
                        Joiners.equal(Module::getEnseignant),
                        Joiners.lessThan(Module::getId))
                .penalize(HardSoftScore.ONE_HARD)
                .asConstraint("Teacher conflict");
    }

    private Constraint studentGroupConflict(ConstraintFactory constraintFactory) {
        // A student can attend at most one module at the same time.
        return constraintFactory.forEach(Module.class)
                .join(Module.class,
                        Joiners.equal(Module::getTimeslot),
                        Joiners.equal(Module::getClasse),
                        Joiners.lessThan(Module::getId))
                .penalize(HardSoftScore.ONE_HARD)
                .asConstraint("Student group conflict");
    }


    Constraint teacherSalleStability(ConstraintFactory constraintFactory) {
        // A teacher prefers to teach in a single salle.
        return constraintFactory
                .forEachUniquePair(Module.class,
                        Joiners.equal(Module::getTeacher))
                .filter((module1, module2) -> module1.getSalle() != module2.getSalle())
                .penalize(HardSoftScore.ONE_SOFT)
                .asConstraint("Teacher salle stability");
    }

    Constraint teacherTimeEfficiency(ConstraintFactory constraintFactory) {
        // A teacher prefers to teach sequential modules and dislikes gaps between modules.
        return constraintFactory
                .forEach(Module.class)
                .join(Module.class, Joiners.equal(Module::getTeacher),
                        Joiners.equal((module) -> module.getTimeslot().getDayOfWeek()))
                .filter((module1, module2) -> {
                    Duration between = Duration.between(module1.getTimeslot().getEndTime(),
                            module2.getTimeslot().getStartTime());
                    return !between.isNegative() && between.compareTo(Duration.ofMinutes(30)) <= 0;
                })
                .reward(HardSoftScore.ONE_SOFT)
                .asConstraint("Teacher time efficiency");
    }

    private Constraint studentTimeDistribution(ConstraintFactory constraintFactory) {
        // A student prefers a more distributed timetable over the week.

        // For each student...
        return constraintFactory
                .forEach(Module.class)
                .join(Module.class,
                        Joiners.equal(Module::getClasse),
                        Joiners.lessThan(Module::getId))
                .filter((module1, module2) -> {
                    DayOfWeek day1 = module1.getTimeslot().getDayOfWeek();
                    DayOfWeek day2 = module2.getTimeslot().getDayOfWeek();
                    return !day1.equals(day2);
                })
                .reward(HardSoftScore.ONE_SOFT)
                .asConstraint("Student time distribution");
    }





}
