package pe.edu.vallegrande.campitos_chicken.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "Presentations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Presentation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idPresentation;

  @ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "id_product", nullable = false)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "category", "description", "area", "area2", "area3", "delivery", "createdAt", "state", "presentations"})
private Product product;



    @Column(name = "presentation_name") // ✅ CORRECTO
    private String presentationName;

    private String description;
    private String code;
    private BigDecimal priceTable;
    private BigDecimal priceTakeaway;
    private BigDecimal priceDelivery;
    private BigDecimal unitCost;
    private Boolean delivery;
    private Boolean state;

    @Column(name = "created_at")
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
