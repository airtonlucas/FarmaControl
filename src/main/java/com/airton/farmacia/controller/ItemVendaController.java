package com.airton.farmacia.controller;
import com.airton.farmacia.dto.ItemVendaDTO;
import com.airton.farmacia.service.ItemVendaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/item-vendas")
@CrossOrigin(
        origins = {
                "http://127.0.0.1:5500",
                "http://localhost:5500"
        }
)
public class ItemVendaController {
    @Autowired
    private ItemVendaService itemVendaService;

    @PostMapping
    public ItemVendaDTO salvar(@RequestBody @Valid ItemVendaDTO itemVenda){
        return itemVendaService.salvar(itemVenda);
    }

    @GetMapping
    public List<ItemVendaDTO> listarTodos(){
        return itemVendaService.listarTodos();
    }

    @PutMapping("{id}")
    public ItemVendaDTO atualizar(@PathVariable Long id, @RequestBody @Valid ItemVendaDTO dto) {
        return itemVendaService.atualizar(id, dto);
    }

    @GetMapping("/{id}")
    public Optional<ItemVendaDTO> buscarPorID(@PathVariable Long id){
        return itemVendaService.buscarPorID(id);
    }
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id){
        itemVendaService.excluir(id);
    }
}