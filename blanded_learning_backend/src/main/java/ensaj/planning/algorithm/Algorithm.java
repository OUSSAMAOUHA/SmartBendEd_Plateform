package ensaj.planning.algorithm;

import ensaj.planning.entities.CustomEnseignatModuleResult;
import ensaj.planning.entities.CustomEtudiantCriteriaResult;
import ensaj.planning.entities.Module;
import ensaj.planning.web.ModuleController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component

public class Algorithm {
    private final ModuleController moduleController;

    @Autowired
    public Algorithm(ModuleController moduleController) {
        this.moduleController = moduleController;
    }

    public  void checkConstraints(CustomEnseignatModuleResult professor, CustomEtudiantCriteriaResult student) {
        boolean isTeaching = false;

        List<Module> modules = moduleController.getAllModules();
        for (Module course : modules) {

            if (professor.isTeachingCourse(course.getLibelle())) {
                isTeaching = true;
                // Check academic requirement and student preference
                String courseTitle = course.getLibelle();
                String academicRequirement = professor.getMode();
                String studentPreference = student.getPreference();
                System.out.println("---------------------" + student.getId() + "---------------------------");
                System.out.println("---------------------" + student.getNom() + "---------------------------");
                System.out.println("=>Course: " + course.getId());
                System.out.println("=>Course: " + courseTitle);
                System.out.println("=>Professor: " + professor.getId());
                System.out.println("=>Professor: " + professor.getNom());
                System.out.println("=>Student preference: " + studentPreference);
                System.out.println("=>Professor/Academic Preference: " + academicRequirement);

                if (academicRequirement.equals(studentPreference) && student.hasValidRequirements()) {
                    System.out.println(academicRequirement);

                    int onsiteSessions = course.getVolumeHoraireOnsite();
                    int remoteSessions = course.getVolumeHoraireOnRemote();
                    int totalSessions = onsiteSessions + remoteSessions;
                    System.out.println("Sessions:" + academicRequirement);
                    if (academicRequirement.equals("Hybrid")) {
                        for (int j = 1; j <= onsiteSessions; j++) {
                            System.out.println("Session " + j + ": On site");
                        }
                        for (int j = 1; j <= remoteSessions; j++) {
                            System.out.println("Session " + j + ": Remote");
                        }
                    } else {
                        for (int i = 1; i <= totalSessions; i++) {

                            System.out.println("Session " + i + ": " + academicRequirement);
                        }

                        int tutorialHours = course.getNbrTD();
                        int practicalHours = course.getNbrTP();
                        int evalHours = course.getNbrEvaluation();
                        for (int i = 1; i <= practicalHours; i++) {
                            System.out.println("TP" + i + ": On site");
                        }
                        for (int i = 1; i <= tutorialHours; i++) {
                            System.out.println("TD" + i + ": On site");
                        }
                        for (int i = 1; i <= evalHours; i++) {
                            System.out.println("Evaluation" + i + ": On site");
                        }
                    }

                } else {

                    if (student.hasValidRequirements()) {

                        System.out.println("            isHasEquipment: " + student.isHasEquipment());
                        System.out.println("            isHasInternet: " + student.isHasInternet());
                        System.out.println("            isHasLearningSpace: " + student.isHasLearningSpace());

                        if (!academicRequirement.equals("On site") && !student.isHasInternet() && !student.isHasEquipment()) {
                            System.out.println("Student " + student.getNom() + ": Student requirements are not met.");


                            academicRequirement = "On site";
                            System.out.println("Just for the student XXXX ");
                            System.out.println("Because of his bad situation ");

                            int onsiteSessions = course.getVolumeHoraireOnsite();
                            int remoteSessions = course.getVolumeHoraireOnRemote();
                            int totalSessions = onsiteSessions + remoteSessions;

                            System.out.println("Sessions:" + academicRequirement);
                            for (int i = 1; i <= totalSessions; i++) {
                                System.out.println("Session " + i + ": On site");
                            }

                            int tutorialHours = course.getNbrTD();
                            int practicalHours = course.getNbrTP();
                            int evalHours = course.getNbrEvaluation();
                            for (int i = 1; i <= practicalHours; i++) {
                                System.out.println("TP" + i + ": On site");
                            }
                            for (int i = 1; i <= tutorialHours; i++) {
                                System.out.println("TD" + i + ": On site");
                            }
                            for (int i = 1; i <= evalHours; i++) {
                                System.out.println("Evaluation" + i + ": On site");
                            }

                        } else if (academicRequirement.equals("On site") && !studentPreference.equals("On site")) {

                            academicRequirement = "On site";
                            System.out.println("            Professor chose 'On site'");
                            System.out.println("=>Algorithme result mode for everyone: " + academicRequirement);

                            int onsiteSessions = course.getVolumeHoraireOnsite();
                            int remoteSessions = course.getVolumeHoraireOnRemote();
                            int totalSessions = onsiteSessions + remoteSessions;

                            System.out.println("Sessions:" + academicRequirement);
                            for (int i = 1; i <= totalSessions; i++) {
                                System.out.println("Session " + i + ": On site");
                            }

                            int tutorialHours = course.getNbrTD();
                            int practicalHours = course.getNbrTP();
                            int evalHours = course.getNbrEvaluation();
                            for (int i = 1; i <= practicalHours; i++) {
                                System.out.println("TP" + i + ": On site");
                            }
                            for (int i = 1; i <= tutorialHours; i++) {
                                System.out.println("TD" + i + ": On site");
                            }
                            for (int i = 1; i <= evalHours; i++) {
                                System.out.println("Evaluation" + i + ": On site");
                            }

                        } else {
                            System.out.println("            Student " + student.getNom() + ": Student requirements are met.");
                            System.out.println("=>Algorithme result mode: " + academicRequirement);
                            int onsiteSessions = course.getVolumeHoraireOnsite();
                            int remoteSessions = course.getVolumeHoraireOnRemote();
                            int totalSessions = onsiteSessions + remoteSessions;

                            System.out.println("Sessions:" + academicRequirement);
                            for (int i = 1; i <= onsiteSessions; i++) {
                                System.out.println("Session " + i + ": On site");
                            }
                            for (int i = 1; i <= remoteSessions; i++) {
                                System.out.println("Session " + i + ": Remote");
                            }

                            int tutorialHours = course.getNbrTD();
                            int practicalHours = course.getNbrTP();
                            int evalHours = course.getNbrEvaluation();
                            for (int i = 1; i <= practicalHours; i++) {
                                System.out.println("TP" + i + ": On site");
                            }
                            for (int i = 1; i <= tutorialHours; i++) {
                                System.out.println("TD" + i + ": On site");
                            }
                            for (int i = 1; i <= evalHours; i++) {
                                System.out.println("Evaluation" + i + ": On site");
                            }


                        }


                    } else {
                        System.out.println("            XXXX Academic requirement does not match student preference.");
                        academicRequirement = "On site";
                        System.out.println("=> Exception Algorithme result mode: " + academicRequirement + "Just for the student XXXX ");
                        System.out.println("Because of his bad situation ");

                        //kaytfala 3lina

                        System.out.println("=>Justification: ");
                        System.out.println("            isHasEquipment: " + student.isHasEquipment());
                        System.out.println("            isHasInternet: " + student.isHasInternet());
                        System.out.println("            isHasLearningSpace: " + student.isHasLearningSpace());
                        System.out.println("Student " + student.getNom() + ": Student requirements are not met.");
                        System.out.println("So why you are choosing this mode??????????");
                        int onsiteSessions = course.getVolumeHoraireOnsite();
                        int remoteSessions = course.getVolumeHoraireOnRemote();
                        int totalSessions = onsiteSessions + remoteSessions;

                        System.out.println("Sessions:" + academicRequirement);
                        for (int i = 1; i <= totalSessions; i++) {
                            System.out.println("Session " + i + ": On site");
                        }
                        int tutorialHours = course.getNbrTD();
                        int practicalHours = course.getNbrTP();
                        int evalHours = course.getNbrEvaluation();
                        for (int i = 1; i <= practicalHours; i++) {
                            System.out.println("TP" + i + ": On site");
                        }
                        for (int i = 1; i <= tutorialHours; i++) {
                            System.out.println("TD" + i + ": On site");
                        }
                        for (int i = 1; i <= evalHours; i++) {
                            System.out.println("Evaluation" + i + ": On site");
                        }
                    }
                }

                System.out.println("------------------------------------------------------------------");
                System.out.println();
            }
        }
    }


}






