package pe.edu.vallegrande.campitos_chicken.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pe.edu.vallegrande.campitos_chicken.model.Supply;
import pe.edu.vallegrande.campitos_chicken.service.SupplyService;

import java.util.List;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/supplies")
@RequiredArgsConstructor
public class SupplyController {

    private final SupplyService service;

    @GetMapping
    public ResponseEntity<List<Supply>> findAllActive() {
        return ResponseEntity.ok(service.findByState(true));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Supply>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Supply> findById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<Supply> create(@RequestBody Supply supply) {
        return ResponseEntity.ok(service.save(supply));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Supply> update(@PathVariable Integer id, @RequestBody Supply supply) {
        return ResponseEntity.ok(service.update(id, supply));
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
