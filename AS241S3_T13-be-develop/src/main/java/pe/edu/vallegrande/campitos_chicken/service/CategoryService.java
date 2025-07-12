package pe.edu.vallegrande.campitos_chicken.service;

import pe.edu.vallegrande.campitos_chicken.model.Category;

import java.util.List;
import java.util.Map;

public interface CategoryService {
    List<Category> findAll();
    List<Map<String, Object>> listarCatalogoAnidado();
    List<Category> findByState(Boolean state);
    Category findById(Integer id);
    Category save(Category category);
    Category update(Integer id, Category category); // <- se cambió aquí
    void deleteLogical(Integer id);
    void restore(Integer id);
    void deletePhysical(Integer id);
}
