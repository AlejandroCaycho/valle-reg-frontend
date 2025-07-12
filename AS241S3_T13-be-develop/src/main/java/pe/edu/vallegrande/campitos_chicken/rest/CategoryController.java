package pe.edu.vallegrande.campitos_chicken.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.vallegrande.campitos_chicken.model.Category;
import pe.edu.vallegrande.campitos_chicken.service.CategoryService;

import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService service;

    @GetMapping
    public ResponseEntity<List<Category>> findActives() {
        return ResponseEntity.ok(service.findByState(true));
    }

    @GetMapping("/all")
public ResponseEntity<List<Category>> findAll() {
    return ResponseEntity.ok(service.findAll()); // sin filtro
}


    @GetMapping("/{id}")
    public ResponseEntity<Category> findById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<Category> create(@RequestBody Category category) {
        return ResponseEntity.ok(service.save(category));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> update(@PathVariable Integer id, @RequestBody Category category) {
        return ResponseEntity.ok(service.update(id, category));
    }

    @PutMapping("/disable/{id}")
    public ResponseEntity<Void> disable(@PathVariable Integer id) {
        service.deleteLogical(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/restore/{id}")
    public ResponseEntity<Void> restore(@PathVariable Integer id) {
        service.restore(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.deletePhysical(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/catalog")
    public ResponseEntity<List<Map<String, Object>>> catalog() {
        return ResponseEntity.ok(service.listarCatalogoAnidado());
    }
}
