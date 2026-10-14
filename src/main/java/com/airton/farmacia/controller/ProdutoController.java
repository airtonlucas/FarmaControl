package com.airton.farmacia.controller;
import com.airton.farmacia.dto.ProdutoDTO;
import com.airton.farmacia.service.ProdutoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/produtos")
@CrossOrigin(
        origins = {
    "http://127.0.0.1:5500",
            "http://localhost:5500"
}
)
public class ProdutoController {
    @Autowired
    private ProdutoService produtoService;

    @PostMapping
    public ProdutoDTO salvar(@RequestBody @Valid ProdutoDTO dto){
        return produtoService.salvar(dto);
    }

    @GetMapping
    public List<ProdutoDTO> listarTodos(){
        return produtoService.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<ProdutoDTO> buscarPorID(@PathVariable Long id) {
        return produtoService.buscarPorID(id);
    }

    @PutMapping("/{id}")
    public ProdutoDTO atualizar(@PathVariable Long id, @RequestBody @Valid ProdutoDTO dto){
        return produtoService.atualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id){
        produtoService.excluir(id);
    }
}