package pe.edu.vallegrande.campitos_chicken.service.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import pe.edu.vallegrande.campitos_chicken.model.DniDto;
import pe.edu.vallegrande.campitos_chicken.service.ApiService;

@Service
public class ApiServiceImpl implements ApiService {

    private final RestTemplate restTemplate;

    @Value("${apis.net.pe.token}")
    private String token;

    public ApiServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public DniDto consultarDni(String dni) {
        String url = "https://api.apis.net.pe/v2/reniec/dni?numero=" + dni;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", "application/json");
        headers.set("Authorization", "Bearer " + token);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<DniDto> response = restTemplate.exchange(url, HttpMethod.GET, entity, DniDto.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            return response.getBody();
        }

        return null;
    }
}
