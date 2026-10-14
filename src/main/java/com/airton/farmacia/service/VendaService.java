package com.airton.farmacia.service;
import com.airton.farmacia.dto.VendaDTO;
import com.airton.farmacia.entity.Cliente;
import com.airton.farmacia.entity.Venda;
import com.airton.farmacia.repository.ClienteRepository;
import com.airton.farmacia.repository.VendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VendaService {
    @Autowired
    private VendaRepository vendaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    private Venda toEntity(VendaDTO dto) {
        Venda venda = new Venda();

        venda.setId(dto.getId());
        venda.setDataVenda(dto.getDataVenda());
        venda.setValorTotal(dto.getValorTotal());

        Cliente cliente = clienteRepository.findById(dto.getClienteID())
                .orElseThrow(()->new RuntimeException("Cliente não encontrado"));

        venda.setCliente(cliente);

        return venda;
    }

    private VendaDTO toDTO(Venda venda) {
        VendaDTO dto = new VendaDTO();

        dto.setId(venda.getId());
        dto.setDataVenda(venda.getDataVenda());
        dto.setValorTotal(venda.getValorTotal());
        dto.setClienteID(venda.getCliente().getId());

        return dto;
    }

    public VendaDTO salvar(VendaDTO dto){
        Venda venda = toEntity(dto);
        Venda vendaSalva = vendaRepository.save(venda);

        return toDTO(vendaSalva);
    }

    public List<VendaDTO> listarTodos(){
        return vendaRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public VendaDTO atualizar(Long id, VendaDTO dto) {
        Venda venda = vendaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Venda não encontrada"));

        Cliente cliente = clienteRepository.findById(dto.getClienteID())
                        .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        venda.setCliente(cliente);
        venda.setValorTotal(dto.getValorTotal());
        venda.setDataVenda(dto.getDataVenda());

        venda = vendaRepository.save(venda);

        return toDTO(venda);
    }

    public Optional<VendaDTO> buscarPorID(Long id){
        return vendaRepository.findById(id)
                .map(this::toDTO);
    }

    public void excluir(Long id) {
        Venda venda = vendaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Venda não encontrada"));
        vendaRepository.delete(venda);
    }
}