package pe.edu.vallegrande.campitos_chicken.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "Products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idProduct;

    @ManyToOne
@JoinColumn(name = "id_category", nullable = false)
private Category category;


    private String name;
    private String description;
    private String area;
    private String area2;
    private String area3;
    private Boolean delivery;
    private Boolean state;

    @Column(name = "created_at")
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<Presentation> presentations;
}
