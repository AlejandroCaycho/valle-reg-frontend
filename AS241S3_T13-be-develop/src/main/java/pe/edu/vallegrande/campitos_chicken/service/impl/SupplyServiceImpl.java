package pe.edu.vallegrande.campitos_chicken.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pe.edu.vallegrande.campitos_chicken.model.Supply;
import pe.edu.vallegrande.campitos_chicken.repository.SupplyRepository;
import pe.edu.vallegrande.campitos_chicken.service.SupplyService;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class SupplyServiceImpl implements SupplyService {

    private final SupplyRepository supplyRepo;

    @Override
    public List<Supply> findAll() {
        return supplyRepo.findAll();
    }

    @Override
    public List<Supply> findByState(Boolean state) {
        return supplyRepo.findByState(state);
    }

    @Override
    public Supply findById(Integer id) {
        return supplyRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Insumo no encontrado con id: " + id));
    }

    @Override
    public Supply save(Supply supply) {
        if (!supply.getHasAllergens()) {
            supply.setAllergenType(null);
        }
        supply.setTotalCost(supply.getQuantity().multiply(supply.getUnitPrice()));
        return supplyRepo.save(supply);
    }

    @Override
    public Supply update(Integer id, Supply supply) {
        if (!supplyRepo.existsById(id)) {
            throw new NoSuchElementException("Insumo no encontrado con id: " + id);
        }
        supply.setIdSupply(id);

        if (!supply.getHasAllergens()) {
            supply.setAllergenType(null);
        }
        supply.setTotalCost(supply.getQuantity().multiply(supply.getUnitPrice()));

        return supplyRepo.save(supply);
    }

    @Override
    public void deleteLogical(Integer id) {
        Supply supply = findById(id);
        supply.setState(false);
        supplyRepo.save(supply);
    }

    @Override
    public void restore(Integer id) {
        Supply supply = findById(id);
        supply.setState(true);
        supplyRepo.save(supply);
    }

    @Override
    public void deletePhysical(Integer id) {
        supplyRepo.deleteById(id);
    }
}
