package pe.edu.vallegrande.campitos_chicken.service;

import pe.edu.vallegrande.campitos_chicken.model.Presentation;

import java.util.List;

public interface PresentationService {

    List<Presentation> findAll();

    List<Presentation> findByState(Boolean state);

    List<Presentation> findByProductIdAndState(Integer productId, Boolean state);

    Presentation findById(Integer id);

    Presentation save(Presentation presentation);

    Presentation update(Integer id, Presentation presentation);

    void deleteLogical(Integer id);

    void restore(Integer id);

    void deletePhysical(Integer id);
}
