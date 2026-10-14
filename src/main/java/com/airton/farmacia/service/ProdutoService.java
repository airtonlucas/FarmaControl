package com.airton.farmacia.service;
import com.airton.farmacia.dto.ProdutoDTO;
import com.airton.farmacia.entity.Produto;
import com.airton.farmacia.repository.ProdutoRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Getter
@Setter
@Service
public class ProdutoService {
    @Autowired
    private ProdutoRepository produtoRepository;

    private Produto toEntity(ProdutoDTO dto) {
        Produto produto = new Produto();

        produto.setId(dto.getId());
        produto.setNome(dto.getNome());
        produto.setCategoria(dto.getCategoria());
        produto.setPreco(dto.getPreco());
        produto.setQuantidadeEstoque(dto.getQuantidadeEstoque());
        produto.setDataValidade(dto.getDataValidade());
        produto.setCodigoBarras(dto.getCodigoBarras());

        return produto;
    }

    private ProdutoDTO toDTO(Produto produto) {
        ProdutoDTO dto = new ProdutoDTO();

        dto.setId(produto.getId());
        dto.setNome(produto.getNome());
        dto.setCategoria(produto.getCategoria());
        dto.setPreco(produto.getPreco());
        dto.setQuantidadeEstoque(produto.getQuantidadeEstoque());
        dto.setDataValidade(produto.getDataValidade());
        dto.setCodigoBarras(produto.getCodigoBarras());

        return dto;
    }

    public ProdutoDTO salvar(ProdutoDTO dto) {
        Produto produto = toEntity(dto);
        Produto produtoSalvo = produtoRepository.save(produto);

        return toDTO(produtoSalvo);
    }

    public ProdutoDTO atualizar(Long id, ProdutoDTO dto){
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        produto.setNome(dto.getNome());
        produto.setCategoria(dto.getCategoria());
        produto.setPreco(dto.getPreco());
        produto.setQuantidadeEstoque(dto.getQuantidadeEstoque());
        produto.setDataValidade(dto.getDataValidade());
        produto.setCodigoBarras(dto.getCodigoBarras());

        Produto produtoAtualizado = produtoRepository.save(produto);

        return toDTO(produtoAtualizado);

        }
    public List<ProdutoDTO> listarTodos() {
        return produtoRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<ProdutoDTO> buscarPorID(Long id) {
        return produtoRepository.findById(id)
                .map(this::toDTO);
    }

    public void excluir(Long id) {
        Produto produto = produtoRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        produtoRepository.delete(produto);
    }
}