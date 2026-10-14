package com.airton.farmacia.dto;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItemVendaDTO {
    private Long id;

    @NotNull(message = "A venda é obrigatória")
    private Long vendaId ;

    @NotNull(message = "O produto é obrigatório")
    private Long produtoId;

    @NotNull(message = "A quantidade é obrigatória")
    private Integer quantidade;

    @NotNull(message = "O preço unitário é obrigatório")
    private Double precoUnitario;
}