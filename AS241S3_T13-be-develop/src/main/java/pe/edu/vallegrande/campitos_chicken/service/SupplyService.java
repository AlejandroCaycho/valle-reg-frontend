package pe.edu.vallegrande.campitos_chicken.service;

import pe.edu.vallegrande.campitos_chicken.model.Supply;

import java.util.List;

public interface SupplyService {

    List<Supply> findAll();

    List<Supply> findByState(Boolean state);

    Supply findById(Integer id);

    Supply save(Supply supply);

    Supply update(Integer id, Supply supply);

    void deleteLogical(Integer id);

    void restore(Integer id);

    void deletePhysical(Integer id);
}
