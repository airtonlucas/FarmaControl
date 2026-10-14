package com.airton.farmacia.controller;
import com.airton.farmacia.dto.VendaDTO;
import com.airton.farmacia.service.VendaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/vendas")
@CrossOrigin(
        origins = {
                "http://127.0.0.1:5500",
                "http://localhost:5500"
        }
)
public class VendaController {
    @Autowired
    private VendaService vendaService;

    @PostMapping
    public VendaDTO salvar(@RequestBody @Valid VendaDTO dto) {
        return vendaService.salvar(dto);
    }

    @GetMapping
    public List<VendaDTO> listarTodos(){
        return vendaService.listarTodos();
    }

    @PutMapping("/{id}")
    public VendaDTO atualizar(@PathVariable Long id, @RequestBody @Valid VendaDTO dto) {
        return vendaService.atualizar(id, dto);
    }

    @GetMapping("/{id}")
    public Optional<VendaDTO> buscarPorID(@PathVariable Long id){
        return vendaService.buscarPorID(id);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id){
        vendaService.excluir(id);
    }
}