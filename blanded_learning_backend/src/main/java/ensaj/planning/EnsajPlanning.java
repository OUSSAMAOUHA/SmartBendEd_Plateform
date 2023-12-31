package ensaj.planning;

import ensaj.planning.entities.Admin;
import ensaj.planning.entities.enums.TypeAdmin;
import ensaj.planning.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class EnsajPlanning {
    public static void main(String[] args) {
        SpringApplication.run(EnsajPlanning.class, args);
    }

  @Bean
   CommandLineRunner lineRunner(UserRepository userRepository,
                                ClasseRepository classeRepository,
                                SemestreRepository semestreRepository,
                                SalleRepository salleRepository,
                                FiliereRepository filiereRepository, ModuleRepository moduleRepository) {
        return args -> {
            // Create the Admin
            if (userRepository.findpersone("ADMIN") == null) {
                Admin admin = new Admin();
                admin.setNom("Admin");
                admin.setPrenom("Admin");
                admin.setEmail("admin@admin.com");
                admin.setPassword("admin@admin");
                admin.setTel("0600000000");
                admin.setCivilite("M");
                admin.setLogin("admin@admin");
                admin.setCne("555");
                admin.setAdmin_type(TypeAdmin.SUPER_ADMIN);
                userRepository.save(admin);
            }
        };

    }


}
