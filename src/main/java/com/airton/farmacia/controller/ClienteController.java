package com.airton.farmacia.controller;
import com.airton.farmacia.dto.ClienteDTO;
import com.airton.farmacia.service.ClienteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/clientes")
@CrossOrigin(
        origins = {
                "http://127.0.0.1:5500",
                "http://localhost:5500"
        }
)
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @PostMapping
    public ClienteDTO salvar(@RequestBody @Valid  ClienteDTO dto){
        return clienteService.salvar(dto);
    }
    @GetMapping
    public List<ClienteDTO> listarTodos(){
        return clienteService.listarTodos();
    }

  @PutMapping("/{id}")
  public ClienteDTO atualizar(@PathVariable Long id, @RequestBody @Valid ClienteDTO dto) {
        return clienteService.atualizar(id,dto);
  }


    @GetMapping("/{id}")
    public Optional<ClienteDTO> buscarPorID(@PathVariable Long id){
        return clienteService.buscarPorID(id) ;
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id){
        clienteService.excluir(id);
    }
}
