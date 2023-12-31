package ensaj.planning.algorithm;

import ensaj.planning.entities.*;
import ensaj.planning.entities.Module;
import ensaj.planning.services.IEtudiantService;
import ensaj.planning.services.IModuleService;
import ensaj.planning.services.ISessionServiceImpl;
import ensaj.planning.web.ModuleController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component

public class Algorithm {
    private final ModuleController moduleController;

    private final IModuleService iModuleService;
    private final ISessionServiceImpl sessionService;

    private final IEtudiantService iEtudiantService;

    @Autowired
    public Algorithm(ModuleController moduleController, IModuleService iModuleService, ISessionServiceImpl sessionService, IEtudiantService iEtudiantService) {
        this.moduleController = moduleController;
        this.iModuleService = iModuleService;
        this.sessionService = sessionService;
        this.iEtudiantService = iEtudiantService;
    }
    public void saveSessionData(Long studentId, Long courseId, Long professorId, String sessionMode) {
        Session session = new Session();

        Etudiant etudiant = new Etudiant();
        etudiant.setId(studentId);

        Module module = new Module();
        module.setId(courseId);

        Enseignant enseignant = new Enseignant();
        enseignant.setId(professorId);

        session.setEtudiant(etudiant);
        session.setModule(module);
        session.setEnseignant(enseignant);
        session.setMode(sessionMode);

        // Save the session data to the database
        sessionService.save(session);
    }

    public  void checkConstraints(CustomEnseignatModuleResult professor, CustomEtudiantCriteriaResult student) {
        boolean isTeaching = false;
        Etudiant etud = iEtudiantService.getEtudById(student.getId());

        List<Module> modules = iModuleService.getModuleByClasse(etud.getClasse().getId());
        for (Module course : modules) {

            if (professor.isTeachingCourse(course.getLibelle())) {
                isTeaching = true;
                // Check academic requirement and student preference
                String courseTitle = course.getLibelle();
                String academicRequirement = professor.getMode();
                String studentPreference = student.getPreference();
                System.out.println("Student:" + student.getId());
                System.out.println("Course: " + course.getId());
                System.out.println("Professor: " + professor.getId());


                if (academicRequirement.equals(studentPreference) && student.hasValidRequirements()) {
                    System.out.println(academicRequirement);

                    int onsiteSessions = course.getVolumeHoraireOnsite();
                    int remoteSessions = course.getVolumeHoraireOnRemote();
                    int totalSessions = onsiteSessions + remoteSessions;
                    System.out.println("Sessions:" + academicRequirement);
                    if (academicRequirement.equals("Hybrid")) {
                        for (int j = 1; j <= onsiteSessions; j++) {
                        }
                        for (int j = 1; j <= remoteSessions; j++) {
                        }
                    } else {
                        for (int i = 1; i <= totalSessions; i++) {
                        }

                        int tutorialHours = course.getNbrTD();
                        int practicalHours = course.getNbrTP();
                        int evalHours = course.getNbrEvaluation();
                        for (int i = 1; i <= practicalHours; i++) {
                        }
                        for (int i = 1; i <= tutorialHours; i++) {
                        }
                        for (int i = 1; i <= evalHours; i++) {
                        }
                    }
                    saveSessionData(student.getId(),course.getId(), professor.getId(),academicRequirement);
                } else {

                    if (student.hasValidRequirements()) {


                        if (!academicRequirement.equals("On site") && !student.isHasInternet() && !student.isHasEquipment()) {


                            academicRequirement = "On site";
                            int onsiteSessions = course.getVolumeHoraireOnsite();
                            int remoteSessions = course.getVolumeHoraireOnRemote();
                            int totalSessions = onsiteSessions + remoteSessions;

                            System.out.println("Sessions:" + academicRequirement);
                            for (int i = 1; i <= totalSessions; i++) {
                            }

                            int tutorialHours = course.getNbrTD();
                            int practicalHours = course.getNbrTP();
                            int evalHours = course.getNbrEvaluation();
                            for (int i = 1; i <= practicalHours; i++) {
                            }
                            for (int i = 1; i <= tutorialHours; i++) {
                            }
                            for (int i = 1; i <= evalHours; i++) {
                            }
                            saveSessionData(student.getId(),course.getId(), professor.getId(),academicRequirement);

                        } else if (academicRequirement.equals("On site") && !studentPreference.equals("On site")) {

                            academicRequirement = "On site";
                            int onsiteSessions = course.getVolumeHoraireOnsite();
                            int remoteSessions = course.getVolumeHoraireOnRemote();
                            int totalSessions = onsiteSessions + remoteSessions;

                            System.out.println("Sessions:" + academicRequirement);
                            for (int i = 1; i <= totalSessions; i++) {
                            }

                            int tutorialHours = course.getNbrTD();
                            int practicalHours = course.getNbrTP();
                            int evalHours = course.getNbrEvaluation();
                            for (int i = 1; i <= practicalHours; i++) {
                            }
                            for (int i = 1; i <= tutorialHours; i++) {
                            }
                            for (int i = 1; i <= evalHours; i++) {
                            }
                            saveSessionData(student.getId(),course.getId(), professor.getId(),academicRequirement);

                        } else {
                            int onsiteSessions = course.getVolumeHoraireOnsite();
                            int remoteSessions = course.getVolumeHoraireOnRemote();
                            int totalSessions = onsiteSessions + remoteSessions;

                            System.out.println("Sessions:" + academicRequirement);
                            for (int i = 1; i <= onsiteSessions; i++) {
                            }
                            for (int i = 1; i <= remoteSessions; i++) {
                            }

                            int tutorialHours = course.getNbrTD();
                            int practicalHours = course.getNbrTP();
                            int evalHours = course.getNbrEvaluation();
                            for (int i = 1; i <= practicalHours; i++) {
                            }
                            for (int i = 1; i <= tutorialHours; i++) {
                            }
                            for (int i = 1; i <= evalHours; i++) {
                            }

                            saveSessionData(student.getId(),course.getId(), professor.getId(),academicRequirement);

                        }


                    } else {
                        academicRequirement = "On site";
                        int onsiteSessions = course.getVolumeHoraireOnsite();
                        int remoteSessions = course.getVolumeHoraireOnRemote();
                        int totalSessions = onsiteSessions + remoteSessions;

                        System.out.println("Sessions:" + academicRequirement);
                        for (int i = 1; i <= totalSessions; i++) {
                        }
                        int tutorialHours = course.getNbrTD();
                        int practicalHours = course.getNbrTP();
                        int evalHours = course.getNbrEvaluation();
                        for (int i = 1; i <= practicalHours; i++) {
                        }
                        for (int i = 1; i <= tutorialHours; i++) {
                        }
                        for (int i = 1; i <= evalHours; i++) {
                        }
                        saveSessionData(student.getId(),course.getId(), professor.getId(),academicRequirement);

                    }
                }

                System.out.println("------------------------------------------------------------------");
                System.out.println();
            }
        }
    }


}






