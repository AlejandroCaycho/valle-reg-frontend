package pe.edu.vallegrande.campitos_chicken.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.vallegrande.campitos_chicken.model.Category;
import pe.edu.vallegrande.campitos_chicken.repository.CategoryRepository;
import pe.edu.vallegrande.campitos_chicken.service.CategoryService;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepo;
    @Override
public List<Category> findAll() {
    return categoryRepo.findAll();
}

    @Override
    public List<Map<String, Object>> listarCatalogoAnidado() {
        List<Category> categories = categoryRepo.findByState(true);

        Map<String, List<Category>> groupedBySection = categories.stream()
            .collect(Collectors.groupingBy(Category::getSection));

        List<Map<String, Object>> result = new ArrayList<>();

        groupedBySection.forEach((section, cats) -> {
            Map<String, Object> sectionMap = new LinkedHashMap<>();
            sectionMap.put("section", section);

            List<Map<String, Object>> categoryList = cats.stream().map(cat -> {
                Map<String, Object> catMap = new LinkedHashMap<>();
                catMap.put("id_category", cat.getIdCategory());
                catMap.put("name", cat.getName());
                catMap.put("products", cat.getProducts().stream()
                    .filter(p -> Boolean.TRUE.equals(p.getState()))
                    .map(p -> {
                        Map<String, Object> prodMap = new LinkedHashMap<>();
                        prodMap.put("id_product", p.getIdProduct());
                        prodMap.put("name", p.getName());
                        prodMap.put("presentations", p.getPresentations().stream()
                            .filter(pr -> Boolean.TRUE.equals(pr.getState()))
                            .collect(Collectors.toList()));
                        return prodMap;
                    }).collect(Collectors.toList()));
                return catMap;
            }).collect(Collectors.toList());

            sectionMap.put("categories", categoryList);
            result.add(sectionMap);
        });

        return result;
    }

    @Override
    public List<Category> findByState(Boolean state) {
        return categoryRepo.findByState(state);
    }

    @Override
    public Category findById(Integer id) {
        return categoryRepo.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Categoría no encontrada"));
    }

    @Override
    public Category save(Category category) {
        return categoryRepo.save(category);
    }

    @Override
    public Category update(Integer id, Category category) {
        if (!categoryRepo.existsById(id))
            throw new NoSuchElementException("Categoría no encontrada");

        category.setIdCategory(id);
        return categoryRepo.save(category);
    }

    @Override
    public void deleteLogical(Integer id) {
        Category cat = findById(id);
        cat.setState(false);
        categoryRepo.save(cat);
    }

    @Override
    public void restore(Integer id) {
        Category cat = findById(id);
        cat.setState(true);
        categoryRepo.save(cat);
    }

    @Override
    public void deletePhysical(Integer id) {
        categoryRepo.deleteById(id);
    }
}
