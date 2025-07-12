package pe.edu.vallegrande.campitos_chicken.service;

import pe.edu.vallegrande.campitos_chicken.model.Product;

import java.util.List;

public interface ProductService {
    List<Product> findAll();                                      // Todos
    List<Product> findByState(Boolean state);                     // Filtrar por estado
    List<Product> findByNameContaining(String name);              // Filtrar por nombre
    List<Product> findByCategoryIdAndState(Integer categoryId, Boolean state); // Por categoría + estado

    Product findById(Integer id);
    Product save(Product product);
    Product update(Integer id, Product product);


    void deleteLogical(Integer id);   // state = false
    void restore(Integer id);         // state = true
    void deletePhysical(Integer id);  // DELETE
}
