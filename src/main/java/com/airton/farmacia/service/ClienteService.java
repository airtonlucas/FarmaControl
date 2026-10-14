package com.airton.farmacia.service;
import com.airton.farmacia.dto.ClienteDTO;
import com.airton.farmacia.entity.Cliente;
import com.airton.farmacia.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClienteService {
    @Autowired
    private ClienteRepository clienteRepository;

    private Cliente toEntity(ClienteDTO dto) {
        Cliente cliente = new Cliente();
        cliente.setId(dto.getId());
        cliente.setNome(dto.getNome());
        cliente.setCpf(dto.getCpf());
        cliente.setTelefone(dto.getTelefone());
        cliente.setEmail(dto.getEmail());

        return cliente;
    }

    private ClienteDTO toDTO(Cliente cliente) {
        ClienteDTO dto = new ClienteDTO();

        dto.setId(cliente.getId());
        dto.setNome(cliente.getNome());
        dto.setCpf(cliente.getCpf());
        dto.setTelefone(cliente.getTelefone());
        dto.setEmail(cliente.getEmail());

        return dto;
    }

    public ClienteDTO salvar(ClienteDTO dto) {
        Cliente cliente = toEntity(dto);
        Cliente cliente1 = clienteRepository.save(cliente);

        return toDTO(cliente1);
    }

    public List<ClienteDTO> listarTodos(){
        return clienteRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public ClienteDTO atualizar(Long id, ClienteDTO dto)  {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        cliente.setNome(dto.getNome());
        cliente.setCpf(dto.getCpf());
        cliente.setTelefone(dto.getTelefone());
        cliente.setEmail(dto.getEmail());

        Cliente clienteAtualizado = clienteRepository.save(cliente);

        return toDTO(clienteAtualizado);
    }

    public Optional<ClienteDTO> buscarPorID(Long id) {
        return clienteRepository.findById(id)
                .map(this::toDTO);
    }

    public void excluir(Long id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        clienteRepository.delete(cliente);
    }
}
