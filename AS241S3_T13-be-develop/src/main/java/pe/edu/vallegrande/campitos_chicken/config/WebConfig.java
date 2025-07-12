package pe.edu.vallegrande.campitos_chicken.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
public void addResourceHandlers(ResourceHandlerRegistry registry) {
    // Para usuarios (ya existente)
    registry.addResourceHandler("/uploads/**")
            .addResourceLocations("file:uploads/");

    // Para platos (nueva configuración)
    registry.addResourceHandler("/uploadsDishes/**")
            .addResourceLocations("file:uploadsDishes/");
}

}
