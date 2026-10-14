package com.airton.farmacia.service;
import com.airton.farmacia.dto.FornecedorDTO;
import com.airton.farmacia.entity.Fornecedor;
import com.airton.farmacia.repository.FornecedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FornecedorService {
    @Autowired
    private FornecedorRepository fornecedorRepository;

    private Fornecedor toEntity(FornecedorDTO dto) {
        Fornecedor fornecedor = new Fornecedor();

       fornecedor.setId(dto.getId());
       fornecedor.setNome(dto.getNome());
       fornecedor.setCnpj(dto.getCnpj());
       fornecedor.setTelefone(dto.getTelefone());
       fornecedor.setEmail(dto.getEmail());

       return fornecedor;
    }

    private FornecedorDTO toDTO(Fornecedor fornecedor ){
        FornecedorDTO dto = new FornecedorDTO();

        dto.setId(fornecedor.getId());
        dto.setNome(fornecedor.getNome());
        dto.setCnpj(fornecedor.getCnpj());
        dto.setTelefone(fornecedor.getTelefone());
        dto.setEmail(fornecedor.getEmail());

        return dto;
    }

    public FornecedorDTO salvar(FornecedorDTO dto ) {
        Fornecedor fornecedor = toEntity(dto);
        Fornecedor fornecedor1 = fornecedorRepository.save(fornecedor);

        return toDTO(fornecedor1);
    }


    public List<FornecedorDTO> listarTodos() {
        return fornecedorRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public FornecedorDTO atualizar(Long id, FornecedorDTO dto) {
        Fornecedor fornecedor = fornecedorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fornecedor não encontrado"));

        fornecedor.setNome(dto.getNome());
        fornecedor.setCnpj(dto.getCnpj());
        fornecedor.setTelefone(dto.getTelefone());
        fornecedor.setEmail(dto.getEmail());

        Fornecedor fornecedor1 = fornecedorRepository.save(fornecedor);

        return toDTO(fornecedor1);
    }

    public Optional<FornecedorDTO> buscarPorID(Long id){
        return fornecedorRepository.findById(id)
                .map(this::toDTO);

    }
    public void excluir(Long id) {
        Fornecedor fornecedor = fornecedorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fornecedor não encontrado"));
        fornecedorRepository.delete(fornecedor);
    }
}