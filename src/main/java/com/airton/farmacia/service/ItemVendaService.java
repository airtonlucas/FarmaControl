package com.airton.farmacia.service;
import com.airton.farmacia.dto.ItemVendaDTO;
import com.airton.farmacia.dto.VendaDTO;
import com.airton.farmacia.entity.ItemVenda;
import com.airton.farmacia.entity.Produto;
import com.airton.farmacia.entity.Venda;
import com.airton.farmacia.repository.ItemVendaRepository;
import com.airton.farmacia.repository.VendaRepository;
import com.airton.farmacia.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ItemVendaService {
    @Autowired
    private ItemVendaRepository itemVendaRepository;

    @Autowired
    private VendaRepository vendaRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    private ItemVenda toEntity (ItemVendaDTO dto){
        ItemVenda item = new ItemVenda();

       item.setId(dto.getId());
       item.setQuantidade(dto.getQuantidade());
       item.setPrecoUnitario(dto.getPrecoUnitario());

       Venda venda = vendaRepository.findById(dto.getVendaId())
               .orElseThrow(() -> new RuntimeException("Venda não encontrada"));

       Produto produto = produtoRepository.findById(dto.getProdutoId())
               .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

       item.setVenda(venda);
       item.setProduto(produto);

       return item;
    }

    private ItemVendaDTO toDTO(ItemVenda itemVenda) {
        ItemVendaDTO dto = new ItemVendaDTO();

      dto.setId(itemVenda.getId());
      dto.setVendaId(itemVenda.getVenda().getId());
      dto.setProdutoId(itemVenda.getProduto().getId());
      dto.setQuantidade(itemVenda.getQuantidade());
      dto.setPrecoUnitario(itemVenda.getPrecoUnitario());

      return dto;
    }

    public ItemVendaDTO salvar(ItemVendaDTO dto) {
        ItemVenda itemVenda = toEntity(dto);
        ItemVenda itemVendaSalva = itemVendaRepository.save(itemVenda);

        return toDTO(itemVendaSalva);
    }

    public List<ItemVendaDTO> listarTodos() {
        return itemVendaRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public ItemVendaDTO atualizar(Long id, ItemVendaDTO dto) {
        ItemVenda itemVenda = itemVendaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item de venda não encontrado"));

        Venda venda = vendaRepository.findById(dto.getVendaId())
                .orElseThrow(() -> new RuntimeException("Venda não encontrada"));

        Produto produto = produtoRepository.findById(dto.getProdutoId())
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        itemVenda.setVenda(venda);
        itemVenda.setProduto(produto);
        itemVenda.setQuantidade(dto.getQuantidade());
        itemVenda.setPrecoUnitario(dto.getPrecoUnitario());

        ItemVenda itemVendaAtualizado = itemVendaRepository.save(itemVenda);
        return toDTO(itemVendaAtualizado);
    }

    public Optional<ItemVendaDTO> buscarPorID(Long id){
        return itemVendaRepository.findById(id)
                .map(this::toDTO);
    }

    public void excluir(Long id) {
        ItemVenda itemVenda = itemVendaRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Item não encontrado"));
        itemVendaRepository.delete(itemVenda);
    }
}