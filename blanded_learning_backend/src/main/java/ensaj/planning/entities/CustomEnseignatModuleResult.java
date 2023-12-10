package ensaj.planning.entities;

import lombok.Data;

@Data
public class CustomEnseignatModuleResult {
    private Long id;
    private String nom;
    private String prenom;
    private String specialite;
    private String libelle;
    private String volume_horaire_onsite;
    private String volume_horaire_on_remote;
    private String semestre;
    private String mode;

    public CustomEnseignatModuleResult() {
        // default constructor
    }
    public CustomEnseignatModuleResult(String nom, String prenom, String libelle, String volume_horaire_onsite, String volume_horaire_on_remote, String mode) {
        this.nom = nom;
        this.prenom = prenom;
        this.libelle = libelle;
        this.volume_horaire_onsite = volume_horaire_onsite;
        this.volume_horaire_on_remote = volume_horaire_on_remote;
        this.mode = mode;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public String getVolume_horaire_onsite() {
        return volume_horaire_onsite;
    }

    public void setVolume_horaire_onsite(String volume_horaire_onsite) {
        this.volume_horaire_onsite = volume_horaire_onsite;
    }

    public String getVolume_horaire_on_remote() {
        return volume_horaire_on_remote;
    }

    public void setVolume_horaire_on_remote(String volume_horaire_on_remote) {
        this.volume_horaire_on_remote = volume_horaire_on_remote;
    }

    public String getMode() {
        return mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }

    public boolean isTeachingCourse(String course) {
        return libelle != null && libelle.equals(course);
    }

}
