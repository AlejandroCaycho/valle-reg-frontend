package pe.edu.vallegrande.campitos_chicken.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.vallegrande.campitos_chicken.model.Category;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    List<Category> findBySectionAndState(String section, Boolean state);
    List<Category> findByState(Boolean state);
    List<Category> findByNameContainingIgnoreCase(String name);
}
