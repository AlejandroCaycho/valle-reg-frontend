package pe.edu.vallegrande.campitos_chicken.service;

import pe.edu.vallegrande.campitos_chicken.model.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface UserService {

    List<User> findAll();
    Optional<User> findById(Integer id);
    List<User> findByState(Boolean state);
    User save(User user);
    User update(User user);
    void deleteLogical(Integer id);  
    void restore(Integer id);        
    User uploadProfilePhoto(Integer id, MultipartFile file) throws IOException;
    byte[] generateJasperPdfReport(boolean activos) throws Exception;
    Optional<User> findByDocumentNumber(String documentNumber);
    Optional<User> findByEmail(String email);
    List<User> findByRole(String role);
    
}
