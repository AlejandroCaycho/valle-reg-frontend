package pe.edu.vallegrande.campitos_chicken.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import pe.edu.vallegrande.campitos_chicken.model.DniDto;
import pe.edu.vallegrande.campitos_chicken.service.ApiService;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/dni")
public class DniRest {

    private final ApiService apiService;

    public DniRest(ApiService apiService) {
        this.apiService = apiService;
    }

    @GetMapping("/{dni}")
    public ResponseEntity<DniDto> obtenerDatosPorDni(@PathVariable String dni) {
        DniDto datos = apiService.consultarDni(dni);

        if (datos == null) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(datos);
    }
}
