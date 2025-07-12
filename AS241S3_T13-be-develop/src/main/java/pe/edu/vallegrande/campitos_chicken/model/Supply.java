package pe.edu.vallegrande.campitos_chicken.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Formula;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "Supplies")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Supply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idSupply;

    private String name;
    private String code;
    private String category;
    private String unit;
    private BigDecimal quantity;
    private BigDecimal minStock;
    private BigDecimal maxStock;
    private String location;
    private BigDecimal unitPrice;

    @Formula("quantity * unit_price")
    private BigDecimal totalCost;

    private String supplier;
    private LocalDate lastPurchaseDate;
    private LocalDate expirationDate;
    private LocalDate productionDate;
    private String lotNumber;

    private Boolean requiresRefrigeration;
    private String recommendedTemperature;
    private Boolean hasAllergens;
    private String allergenType;
    private String description;
    private String imageUrl;
    private Boolean state;

    @Column(name = "created_at")
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
