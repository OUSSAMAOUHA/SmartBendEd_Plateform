package ensaj.planning;

import java.util.ArrayList;
import java.util.List;

class Course {
    // Définissez les attributs de la classe Course
    private int nbCM;
    private int nbTD;
    private int nbTP;
    private int nbEval;
    private String learningMode;

    public Course(int nbCM, int nbTD, int nbTP, int nbEval, String learningMode) {
        this.nbCM = nbCM;
        this.nbTD = nbTD;
        this.nbTP = nbTP;
        this.nbEval = nbEval;
        this.learningMode = learningMode;
    }

    // Définissez les méthodes getters pour les attributs
    public int getNbCM() {
        return nbCM;
    }

    public int getNbTD() {
        return nbTD;
    }

    public int getNbTP() {
        return nbTP;
    }

    public int getNbEval() {
        return nbEval;
    }

    public String getLearningMode() {
        return learningMode;
    }
}

class InstritutionCriteria {
    // Définissez les attributs et les méthodes de la classe InstritutionCriteria
    private int nbHourPerSeance;

    public InstritutionCriteria(int nbHourPerSeance) {
        this.nbHourPerSeance = nbHourPerSeance;
    }

    public int getNbHourPerSeance() {
        return nbHourPerSeance;
    }
}

class Session {
    // Définissez les attributs et les méthodes de la classe Session
    private String sessionName;
    private int sessionNbHours;

    public void setSessionName(String sessionName) {
        this.sessionName = sessionName;
    }

    public void setSessionNbHours(int sessionNbHours) {
        this.sessionNbHours = sessionNbHours;
    }

    // Ajoutez d'autres méthodes et attributs si nécessaire
}

public class ProgramGenerator {
    public static void main(String[] args) {
        // Créez une liste de cours
        List<Course> listCourse = new ArrayList<>();
        // Ajoutez des cours à la liste
        listCourse.add(new Course(2, 2, 1, 1, "Remote"));
        listCourse.add(new Course(3, 2, 2, 2, "OnSite"));

        // Créez des critères institutionnels
        InstritutionCriteria institutionCriteria = new InstritutionCriteria(3);

        // Pour chaque cours dans la liste des cours
        for (Course course : listCourse) {
            // Obtenir les détails du cours
            int nbCM = course.getNbCM();
            int nbTD = course.getNbTD();
            int nbTP = course.getNbTP();
            int nbEval = course.getNbEval();
            String learningMode = course.getLearningMode();

            // Calculer le nombre d'heures de cours total
            int nbCourseHour = nbCM + nbTD + nbTP + nbEval;

            // Calculer le nombre de séances nécessaires
            int nbHourPerSeance = institutionCriteria.getNbHourPerSeance();
            int calculateNbSeance = nbCourseHour / nbHourPerSeance;

            // Initialiser d'autres variables
            int seanceOrder = 0;
            String typePrevious = "";
            // Calculez le pourcentage d'heures sur site et à distance en fonction des matériaux de cours
            int nbhours = 100; // Vous devrez définir la valeur correcte
            int pourcenteageOnSIte = (nbCM * nbhours) / 100;
            int pourcentageRemote = (nbTP * nbhours) / 100;

            // Pour chaque séance nécessaire
            for (int i = 0; i < calculateNbSeance; i++) {
                // Créez une nouvelle session
                Session session = new Session();
                seanceOrder++;
                session.setSessionName("Session " + seanceOrder);
                session.setSessionNbHours(nbHourPerSeance);

                // Programmez la session en fonction des conditions
                if (typePrevious.equals("") || typePrevious.equals("TP")) {
                    if (pourcentageRemote > 0) {
                        // Programmez la session CM à distance
                        // Mettez en œuvre la logique appropriée ici
                    } else {
                        // Programmez la session CM sur site
                        // Mettez en œuvre la logique appropriée ici
                    }
                } else if (typePrevious.equals("CM")) {
                    if (pourcenteageOnSIte > 0) {
                        // Programmez la session TD si possible
                        // Mettez en œuvre la logique appropriée ici
                    } else {
                        // Programmez la session TP si possible
                        // Mettez en œuvre la logique appropriée ici
                    }
                } else {
                    // Programmez la session TP sur site si possible
                    // Mettez en œuvre la logique appropriée ici
                }

                // Créez également la session d'évaluation en fonction des matériaux de cours
                // Mettez en œuvre la logique appropriée ici
            }
        }
    }
}
