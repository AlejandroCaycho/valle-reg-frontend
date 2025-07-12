package pe.edu.vallegrande.campitos_chicken.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.vallegrande.campitos_chicken.model.Supply;

import java.util.List;

@Repository
public interface SupplyRepository extends JpaRepository<Supply, Integer> {
    List<Supply> findByState(Boolean state);
    List<Supply> findByNameContainingIgnoreCase(String name);
}
