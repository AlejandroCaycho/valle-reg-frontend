package pe.edu.vallegrande.campitos_chicken.service;

import pe.edu.vallegrande.campitos_chicken.model.DniDto;

public interface ApiService {
    DniDto consultarDni(String dni);
}
