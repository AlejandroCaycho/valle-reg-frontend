package pe.edu.vallegrande.campitos_chicken.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pe.edu.vallegrande.campitos_chicken.model.Product;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByState(Boolean state);
    List<Product> findByNameContainingIgnoreCase(String name);
    List<Product> findByCategory_IdCategoryAndState(Integer categoryId, Boolean state);
}
