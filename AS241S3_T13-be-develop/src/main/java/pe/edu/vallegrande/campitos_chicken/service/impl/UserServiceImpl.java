package pe.edu.vallegrande.campitos_chicken.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import pe.edu.vallegrande.campitos_chicken.model.User;
import pe.edu.vallegrande.campitos_chicken.repository.UserRepository;
import pe.edu.vallegrande.campitos_chicken.service.UserService;

import javax.sql.DataSource;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final DataSource dataSource;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, DataSource dataSource) {
        this.userRepository = userRepository;
        this.dataSource = dataSource;
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findById(Integer id) {
        return userRepository.findById(id);
    }

    @Override
    public List<User> findByState(Boolean state) {
        return userRepository.findByState(state);
    }

    @Override
    public User save(User user) {
        user.setState(true); // Activo por defecto
        if (user.getRegistrationDate() == null) {
            user.setRegistrationDate(LocalDateTime.now());
        }
        return userRepository.save(user);
    }

    @Override
    public User update(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteLogical(Integer id) {
        userRepository.findById(id).ifPresent(user -> {
            user.setState(false);
            userRepository.save(user);
        });
    }

    @Override
    public void restore(Integer id) {
        userRepository.findById(id).ifPresent(user -> {
            user.setState(true);
            userRepository.save(user);
        });
    }

    @Override
    public User uploadProfilePhoto(Integer id, MultipartFile file) throws IOException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        String uploadDir = "uploads";

        // Eliminar foto anterior si existe
        if (user.getProfilePhoto() != null && !user.getProfilePhoto().isEmpty()) {
            Path oldPhotoPath = Paths.get(uploadDir, user.getProfilePhoto());
            Files.deleteIfExists(oldPhotoPath);
        }

        // Guardar nueva foto
        String filename = "user_" + id + "_" + System.currentTimeMillis() + ".png";
        Path newPhotoPath = Paths.get(uploadDir, filename);
        Files.createDirectories(newPhotoPath.getParent());
        Files.write(newPhotoPath, file.getBytes());

        user.setProfilePhoto(filename);
        return userRepository.save(user);
    }

    @Override
    public byte[] generateJasperPdfReport(boolean activos) throws Exception {
        String fileName = activos ? "Users_A.jasper" : "Users_I.jasper";
        InputStream jasperStream = new ClassPathResource("reports/" + fileName).getInputStream();

        Map<String, Object> params = new HashMap<>();

        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperStream, params, dataSource.getConnection());
        return JasperExportManager.exportReportToPdf(jasperPrint);
    }

    // 🔍 Extras opcionales para login u otras validaciones
    public Optional<User> findByDocumentNumber(String documentNumber) {
        return userRepository.findByDocumentNumber(documentNumber);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<User> findByRole(String role) {
        return userRepository.findByRole(role);
    }
}
