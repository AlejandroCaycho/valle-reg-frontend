package pe.edu.vallegrande.campitos_chicken.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.vallegrande.campitos_chicken.model.Presentation;

import java.util.List;

@Repository
public interface PresentationRepository extends JpaRepository<Presentation, Integer> {
    List<Presentation> findByState(Boolean state);
    List<Presentation> findByProduct_IdProductAndState(Integer productId, Boolean state);
}
