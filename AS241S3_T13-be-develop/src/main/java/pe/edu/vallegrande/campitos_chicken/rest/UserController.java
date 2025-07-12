package pe.edu.vallegrande.campitos_chicken.rest;

import pe.edu.vallegrande.campitos_chicken.model.User;
import pe.edu.vallegrande.campitos_chicken.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpStatus;
import java.io.IOException;

import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/v1/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        try {
            Integer userId = Integer.parseInt(id);
            return userService.findById(userId)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/state/{state}")
    public List<User> getUsersByState(@PathVariable Boolean state) {
        return userService.findByState(state);
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.save(user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Integer id, @RequestBody User user) {
        Optional<User> existingUserOpt = userService.findById(id);

        if (!existingUserOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        User existingUser = existingUserOpt.get();
        existingUser.setDocumentType(user.getDocumentType());
        existingUser.setDocumentNumber(user.getDocumentNumber());
        existingUser.setName(user.getName());
        existingUser.setSurnames(user.getSurnames());
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(user.getPassword());
        existingUser.setRole(user.getRole());
        existingUser.setPhone(user.getPhone());
        existingUser.setAdress(user.getAdress());
        existingUser.setGender(user.getGender());
        existingUser.setState(user.getState());

        User updatedUser = userService.update(existingUser);

        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        userService.deleteLogical(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/restore/{id}")
    public ResponseEntity<Void> restoreUser(@PathVariable Integer id) {
        userService.restore(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/upload-photo")
    public ResponseEntity<?> uploadProfilePhoto(@PathVariable Integer id,
                                                @RequestParam("file") MultipartFile file) {
        try {
            User updatedUser = userService.uploadProfilePhoto(id, file);
            return ResponseEntity.ok(updatedUser);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al subir la foto");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
        }
    }

  @GetMapping("/pdfUserActive")
public ResponseEntity<byte[]> generateActiveUsersPdf() throws Exception {
    byte[] pdf = userService.generateJasperPdfReport(true);
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_PDF);
    headers.setContentDisposition(ContentDisposition.attachment().filename("users_active.pdf").build());
    return new ResponseEntity<>(pdf, headers, HttpStatus.OK);
}

@GetMapping("/pdfUserInactive")
public ResponseEntity<byte[]> generateInactiveUsersPdf() throws Exception {
    byte[] pdf = userService.generateJasperPdfReport(false);
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_PDF);
    headers.setContentDisposition(ContentDisposition.attachment().filename("users_inactive.pdf").build());
    return new ResponseEntity<>(pdf, headers, HttpStatus.OK);
}

}
