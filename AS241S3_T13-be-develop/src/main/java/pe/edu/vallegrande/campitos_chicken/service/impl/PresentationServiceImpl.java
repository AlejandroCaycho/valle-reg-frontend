package pe.edu.vallegrande.campitos_chicken.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.vallegrande.campitos_chicken.model.Presentation;
import pe.edu.vallegrande.campitos_chicken.repository.PresentationRepository;
import pe.edu.vallegrande.campitos_chicken.service.PresentationService;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class PresentationServiceImpl implements PresentationService {

    private final PresentationRepository presentationRepo;

    @Override
    public List<Presentation> findAll() {
        return presentationRepo.findAll();
    }

    @Override
    public List<Presentation> findByState(Boolean state) {
        return presentationRepo.findByState(state);
    }

    @Override
    public List<Presentation> findByProductIdAndState(Integer productId, Boolean state) {
        return presentationRepo.findByProduct_IdProductAndState(productId, state);
    }

    @Override
    public Presentation findById(Integer id) {
        return presentationRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Presentación no encontrada con id: " + id));
    }

    @Override
    public Presentation save(Presentation presentation) {
        return presentationRepo.save(presentation);
    }

    @Override
    public Presentation update(Integer id, Presentation presentation) {
        if (!presentationRepo.existsById(id)) {
            throw new NoSuchElementException("Presentación no encontrada con id: " + id);
        }
        presentation.setIdPresentation(id);
        return presentationRepo.save(presentation);
    }

    @Override
    public void deleteLogical(Integer id) {
        Presentation p = findById(id);
        p.setState(false);
        presentationRepo.save(p);
    }

    @Override
    public void restore(Integer id) {
        Presentation p = findById(id);
        p.setState(true);
        presentationRepo.save(p);
    }

    @Override
    public void deletePhysical(Integer id) {
        presentationRepo.deleteById(id);
    }
}
