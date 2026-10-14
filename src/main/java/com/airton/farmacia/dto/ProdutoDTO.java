package com.airton.farmacia.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProdutoDTO {
    private Long id;

    @NotBlank(message = "O nome de produto é obrigatório")
    private String nome;

    @NotBlank(message = "A categoria é obrigatória")
    private String categoria;

    @NotNull(message = "O preço é obrigatório")
    @Positive(message = "O preço deve ser maior que zero")
    private Double preco;

    @NotNull(message = "A quantidade em estoque é obrigatória")
    @Positive(message = "A quantidade deve ser maior que zero")
    private Integer quantidadeEstoque;

    private LocalDate dataValidade;

    @NotBlank(message = "O código de barras é obrigatório")
    private String codigoBarras;
}