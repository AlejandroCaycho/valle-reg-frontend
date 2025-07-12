package pe.edu.vallegrande.campitos_chicken.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "Users")
@Data 
@NoArgsConstructor
@AllArgsConstructor 
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user")   
    private Integer idUser;
    @Column(name = "document_type", nullable = false, length = 10)
    private String documentType;
    @Column(name = "document_number", nullable = false, unique = true, length = 20)
    private String documentNumber;
    @Column(length = 100)
    private String name;
    @Column(length = 100)
    private String surnames;
    @Column(length = 150, unique = true)
    private String email;
    @Column(length = 225)
    private String password;
    @Column(length = 20)
    private String role;
    @Column(length = 9)
    private String phone;
    @Column(length = 100)
    private String adress;
    @Column(length = 1)
    private String gender;
    @Column(name = "profile_photo", length = 255)
    private String profilePhoto;
    @Column
    private Boolean state;
    @Column(name = "registration_date")
    private LocalDateTime registrationDate;
}
