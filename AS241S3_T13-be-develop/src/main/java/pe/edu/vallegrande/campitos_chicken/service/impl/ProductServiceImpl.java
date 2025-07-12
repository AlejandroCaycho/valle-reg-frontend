package pe.edu.vallegrande.campitos_chicken.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.vallegrande.campitos_chicken.model.Product;
import pe.edu.vallegrande.campitos_chicken.repository.ProductRepository;
import pe.edu.vallegrande.campitos_chicken.service.ProductService;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepo;

    @Override
    public List<Product> findAll() {
        return productRepo.findAll();
    }

    @Override
    public List<Product> findByState(Boolean state) {
        return productRepo.findByState(state);
    }

    @Override
    public List<Product> findByNameContaining(String name) {
        return productRepo.findByNameContainingIgnoreCase(name);
    }

    @Override
    public List<Product> findByCategoryIdAndState(Integer categoryId, Boolean state) {
        return productRepo.findByCategory_IdCategoryAndState(categoryId, state);
    }

    @Override
    public Product findById(Integer id) {
        return productRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Producto no encontrado con id: " + id));
    }

    @Override
    public Product save(Product product) {
        return productRepo.save(product);
    }

    @Override
    public Product update(Integer id, Product product) {
        if (!productRepo.existsById(id)) {
            throw new NoSuchElementException("Producto no encontrado con id: " + id);
        }
        product.setIdProduct(id); // aseguramos que el ID sea el correcto
        return productRepo.save(product);
    }

    @Override
    public void deleteLogical(Integer id) {
        Product p = findById(id);
        p.setState(false);
        productRepo.save(p);
    }

    @Override
    public void restore(Integer id) {
        Product p = findById(id);
        p.setState(true);
        productRepo.save(p);
    }

    @Override
    public void deletePhysical(Integer id) {
        productRepo.deleteById(id);
    }
}
