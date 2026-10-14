package com.airton.farmacia.controller;
import com.airton.farmacia.dto.FornecedorDTO;
import com.airton.farmacia.service.FornecedorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/fornecedores")
@CrossOrigin(
        origins = {
                "http://127.0.0.1:5500",
                "http://localhost:5500"
        }
)
public class FornecedorController {
    @Autowired
    private FornecedorService fornecedorService;

    @PostMapping
   public FornecedorDTO salvar(@RequestBody @Valid FornecedorDTO dto){
        return fornecedorService.salvar(dto);
    }

    @GetMapping
    public List<FornecedorDTO> listarTodos(){
        return fornecedorService.listarTodos();
    }

    @PutMapping("{id}")
    public FornecedorDTO atualizar(@PathVariable Long id, @RequestBody @Valid FornecedorDTO dto){
        return fornecedorService.atualizar(id, dto);
    }

    @GetMapping("/{id}")
    public Optional<FornecedorDTO> buscarPorID(@PathVariable Long id){
        return fornecedorService.buscarPorID(id);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id){
        fornecedorService.excluir(id);
    }
}
