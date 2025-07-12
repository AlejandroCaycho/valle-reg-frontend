package pe.edu.vallegrande.campitos_chicken.repository;

import pe.edu.vallegrande.campitos_chicken.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    // Buscar por estado (activo/inactivo)
    List<User> findByState(Boolean state);

    // Buscar por correo (para login o validación)
    Optional<User> findByEmail(String email);

    // Buscar por documento (DNI, CE, PAS)
    Optional<User> findByDocumentNumber(String documentNumber);

    // Buscar por tipo y número de documento juntos
    Optional<User> findByDocumentTypeAndDocumentNumber(String documentType, String documentNumber);

    // Buscar todos los usuarios de un rol específico (admin, mozo, etc.)
    List<User> findByRole(String role);
}
