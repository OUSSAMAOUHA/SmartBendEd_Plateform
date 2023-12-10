package ensaj.planning.entities;

import lombok.Data;

@Data
public class CustomEtudiantCriteriaResult {
    private Long id;
    private String civilite;
    private String cne;
    private String email;
    private String nom;
    private String prenom;
    private String tel;
    private String preference;
    private String equipment;
    private String learningSpace;
    private String infrastructure;

    public CustomEtudiantCriteriaResult( String civilite, String cne, String email, String nom, String prenom, String tel, String preference, String equipment, String learningSpace, String infrastructure) {

        this.civilite = civilite;
        this.cne = cne;
        this.email = email;
        this.nom = nom;
        this.prenom = prenom;
        this.tel = tel;
        this.preference = preference;
        this.equipment = equipment;
        this.learningSpace = learningSpace;
        this.infrastructure = infrastructure;
    }
    public CustomEtudiantCriteriaResult() {
        // default constructor
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCivilite() {
        return civilite;
    }

    public void setCivilite(String civilite) {
        this.civilite = civilite;
    }

    public String getCne() {
        return cne;
    }

    public void setCne(String cne) {
        this.cne = cne;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getPreference() {
        return preference;
    }

    public void setPreference(String preference) {
        this.preference = preference;
    }

    public String getEquipment() {
        return equipment;
    }

    public void setEquipment(String equipment) {
        this.equipment = equipment;
    }

    public String getLearningSpace() {
        return learningSpace;
    }

    public void setLearningSpace(String learningSpace) {
        this.learningSpace = learningSpace;
    }

    public String getInfrastructure() {
        return infrastructure;
    }

    public void setInfrastructure(String infrastructure) {
        this.infrastructure = infrastructure;
    }
    public boolean isHasEquipment() {
        return Boolean.parseBoolean(equipment);
    }

    public boolean isHasInternet() {
        return Boolean.parseBoolean(learningSpace);
    }

    public boolean isHasLearningSpace() {
        return Boolean.parseBoolean(infrastructure);
    }
    public void transformValues() {
        this.equipment = transformBooleanValue(equipment);
        this.learningSpace = transformBooleanValue(learningSpace);
        this.infrastructure = transformBooleanValue(infrastructure);
    }

    private String transformBooleanValue(String originalValue) {
        // Check for null before invoking equalsIgnoreCase
        return originalValue != null && originalValue.equalsIgnoreCase("Yes") ? "true" : "false";
    }

    public boolean hasValidRequirements() {
        if ("Hybrid".equalsIgnoreCase(preference) || "Remote".equalsIgnoreCase(preference)) {
            return Boolean.parseBoolean(equipment) && Boolean.parseBoolean(learningSpace) && Boolean.parseBoolean(infrastructure);
        }
        return true;
    }

}
