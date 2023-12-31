package ensaj.planning.entities;

import org.optaplanner.core.api.solver.Solver;
import org.optaplanner.core.api.solver.SolverFactory;
import org.optaplanner.core.config.solver.SolverConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static ensaj.planning.entities.enums.TypeSalle.Simple;

public class TimeTableApp {

    private static final Logger LOGGER = LoggerFactory.getLogger(TimeTableApp.class);

    public static void main(String[] args) {
        SolverFactory<TimeTable> solverFactory = SolverFactory.create(new SolverConfig()
                .withSolutionClass(TimeTable.class)
                .withEntityClasses(Module.class)
                .withConstraintProviderClass(TimeTableConstraintProvider.class)
                // The solver runs only for 5 seconds on this small dataset.
                // It's recommended to run for at least 5 minutes ("5m") otherwise.
                .withTerminationSpentLimit(Duration.ofSeconds(5)));

        // Load the problem
        TimeTable problem = generateDemoData();

        // Solve the problem
        Solver<TimeTable> solver = solverFactory.buildSolver();
        TimeTable solution = solver.solve(problem);

        // Visualize the solution
        printTimetable(solution);

        System.out.println(solution);
    }

    public static TimeTable generateDemoData() {
        List<Timeslot> timeslotList = new ArrayList<>(10);
        timeslotList.add(new Timeslot(DayOfWeek.MONDAY, LocalTime.of(8, 30), LocalTime.of(9, 30)));
        timeslotList.add(new Timeslot(DayOfWeek.MONDAY, LocalTime.of(9, 30), LocalTime.of(10, 30)));
        timeslotList.add(new Timeslot(DayOfWeek.MONDAY, LocalTime.of(10, 30), LocalTime.of(11, 30)));
        timeslotList.add(new Timeslot(DayOfWeek.MONDAY, LocalTime.of(13, 30), LocalTime.of(14, 30)));
        timeslotList.add(new Timeslot(DayOfWeek.MONDAY, LocalTime.of(14, 30), LocalTime.of(15, 30)));

        timeslotList.add(new Timeslot(DayOfWeek.TUESDAY, LocalTime.of(8, 30), LocalTime.of(9, 30)));
        timeslotList.add(new Timeslot(DayOfWeek.TUESDAY, LocalTime.of(9, 30), LocalTime.of(10, 30)));
        timeslotList.add(new Timeslot(DayOfWeek.TUESDAY, LocalTime.of(10, 30), LocalTime.of(11, 30)));
        timeslotList.add(new Timeslot(DayOfWeek.TUESDAY, LocalTime.of(13, 30), LocalTime.of(14, 30)));
        timeslotList.add(new Timeslot(DayOfWeek.TUESDAY, LocalTime.of(14, 30), LocalTime.of(15, 30)));



        List<Salle> salleList = new ArrayList<>(3);
        Salle s1 = new Salle(1L,"A",1,32,Simple);
        salleList.add(s1);
        Salle s2 = new Salle(2L,"A",2,32,Simple);
        salleList.add(s2);
        Salle s3 = new Salle(3L,"A",3,32,Simple);
        salleList.add(s3);


        List<Module> moduleList = new ArrayList<>();
        long id = 0;
        Module m1= new Module();
        m1.setId(1L);
        m1.setLibelle("Math Ouss");
        Enseignant e1= new Enseignant();
        e1.setNom("Ouss");
        m1.setEnseignant(e1);
        Classe c1= new Classe();
        c1.setLibelle("2ITE-1");
        m1.setClasse(c1);
        moduleList.add(m1);

// Création d'un autre module
        Module m2 = new Module();
        m2.setId(2L);
        m2.setLibelle("Histoire Reda");
        Enseignant e2 = new Enseignant();
        e2.setNom("Reda");
        m2.setEnseignant(e2);
        m2.setClasse(c1);
        moduleList.add(m2);

        // Création d'un autre module
        Module m3 = new Module();
        m3.setId(3L);
        m3.setLibelle("Science Smith");
        Enseignant e3 = new Enseignant();
        e3.setNom("Smith");
        m3.setEnseignant(e3);
        m3.setClasse(c1);
        moduleList.add(m3);


        Module m4 = new Module();
        m4.setId(4L);
        m4.setLibelle("Français ");
        m4.setEnseignant(e1);
        m4.setClasse(c1);
        moduleList.add(m4);

        Module m5 = new Module();
        m5.setId(5L);
        m5.setLibelle("Physique");
        m5.setEnseignant(e1);
        m5.setClasse(c1);
        moduleList.add(m5);

        Module m6 = new Module();
        m6.setId(6L);
        m6.setLibelle("Chimie");
        m6.setEnseignant(e1);
        m6.setClasse(c1);
        moduleList.add(m6);


        Module m11= new Module();
        m11.setId(11L);
        m11.setLibelle("Math Ouss");
        m11.setEnseignant(e1);
        Classe c2= new Classe();
        c2.setLibelle("2ITE-2");
        m11.setClasse(c2);
        moduleList.add(m11);

// Création d'un autre module
        Module m22 = new Module();
        m22.setId(22L);
        m22.setLibelle("Histoire Reda");
        m22.setEnseignant(e2);
        m22.setClasse(c2);
        moduleList.add(m22);

        Module m33 = new Module();
        m33.setId(33L);
        m33.setLibelle("Histoire 3");
        m33.setEnseignant(e3);
        m33.setClasse(c2);
        moduleList.add(m33);

        Module m44 = new Module();
        m44.setId(44L);
        m44.setLibelle("Histoire 3");
        m44.setEnseignant(e3);
        m44.setClasse(c2);
        moduleList.add(m44);

        Module m55 = new Module();
        m55.setId(55L);
        m55.setLibelle("Histoire 3");
        m55.setEnseignant(e3);
        m55.setClasse(c2);
        moduleList.add(m55);

        return new TimeTable(timeslotList, salleList, moduleList);
    }

    private static void printTimetable(TimeTable timeTable) {
        List<Salle> salleList = timeTable.getSalleList();
        List<Module> moduleList = timeTable.getModuleList();
        Map<Timeslot, Map<Salle, List<Module>>> moduleMap = moduleList.stream()
                .filter(module -> module.getTimeslot() != null && module.getSalle() != null)
                .collect(Collectors.groupingBy(Module::getTimeslot, Collectors.groupingBy(Module::getSalle)));

        for (Timeslot timeslot : timeTable.getTimeslotList()) {
            System.out.println("Timeslot: " + timeslot.getDayOfWeek().toString().substring(0, 3) + " " + timeslot.getStartTime());

            List<List<Module>> cellList = salleList.stream()
                    .map(salle -> {
                        Map<Salle, List<Module>> bySalleMap = moduleMap.get(timeslot);
                        if (bySalleMap == null) {
                            return Collections.<Module>emptyList();
                        }
                        List<Module> cellModuleList = bySalleMap.get(salle);
                        if (cellModuleList == null) {
                            return Collections.<Module>emptyList();
                        }
                        return cellModuleList;
                    })
                    .collect(Collectors.toList());

            System.out.println("| " + String.format("%-10s",
                    "Modules") + " | "
                    + cellList.stream().map(cellModuleList -> String.format("%-10s",
                            cellModuleList.stream().map(Module::getSubject).collect(Collectors.joining(", "))))
                    .collect(Collectors.joining(" | "))
                    + " |");
            System.out.println("|            | "
                    + cellList.stream().map(cellModuleList -> String.format("%-10s",
                            cellModuleList.stream().map(Module::getTeacher).collect(Collectors.joining(", "))))
                    .collect(Collectors.joining(" | "))
                    + " |");
            System.out.println("|            | "
                    + cellList.stream().map(cellModuleList -> String.format("%-10s",
                            cellModuleList.stream().map(Module::getStudentGroup).collect(Collectors.joining(", "))))
                    .collect(Collectors.joining(" | "))
                    + " |");
            System.out.println("|" + "------------|".repeat(salleList.size() + 1));
        }
    }


}