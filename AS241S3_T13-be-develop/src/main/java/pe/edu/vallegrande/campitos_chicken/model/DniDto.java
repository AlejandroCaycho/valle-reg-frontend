package pe.edu.vallegrande.campitos_chicken.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DniDto {
    
    @JsonIgnore
    private String numero;
    
    private String nombres;

    @JsonProperty("apellidoPaterno")
    private String apellidoPaterno;

    @JsonProperty("apellidoMaterno")
    private String apellidoMaterno;

    @JsonIgnore
    private String estado;
}
