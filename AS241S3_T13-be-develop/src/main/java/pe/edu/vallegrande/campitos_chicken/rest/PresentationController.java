package pe.edu.vallegrande.campitos_chicken.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.vallegrande.campitos_chicken.model.Presentation;
import pe.edu.vallegrande.campitos_chicken.service.PresentationService;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/presentations")
@RequiredArgsConstructor
public class PresentationController {

    private final PresentationService service;

    @GetMapping
    public ResponseEntity<List<Presentation>> findAllActive() {
        return ResponseEntity.ok(service.findByState(true));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Presentation>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Presentation> findById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Presentation>> findByProduct(@PathVariable Integer productId) {
        return ResponseEntity.ok(service.findByProductIdAndState(productId, true));
    }

    @PostMapping
    public ResponseEntity<Presentation> create(@RequestBody Presentation presentation) {
        return ResponseEntity.ok(service.save(presentation));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Presentation> update(@PathVariable Integer id, @RequestBody Presentation presentation) {
        return ResponseEntity.ok(service.update(id, presentation));
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
