package pe.edu.vallegrande.campitos_chicken.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.vallegrande.campitos_chicken.model.Product;
import pe.edu.vallegrande.campitos_chicken.service.ProductService;

import java.util.List;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService service;

    @GetMapping
    public ResponseEntity<List<Product>> findAllActive() {
        return ResponseEntity.ok(service.findByState(true));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Product>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> findById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> findByName(@RequestParam String name) {
        return ResponseEntity.ok(service.findByNameContaining(name));
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Product>> findByCategory(@PathVariable Integer categoryId) {
        return ResponseEntity.ok(service.findByCategoryIdAndState(categoryId, true));
    }

    @PostMapping
    public ResponseEntity<Product> create(@RequestBody Product product) {
        return ResponseEntity.ok(service.save(product));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> update(@PathVariable Integer id, @RequestBody Product product) {
        return ResponseEntity.ok(service.update(id, product));
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
}
