package ensaj.planning.services;


import ensaj.planning.entities.AuthRespense;

public interface IAuth {

    public AuthRespense login(String login, String password);
    public void logout(Long id);
}
