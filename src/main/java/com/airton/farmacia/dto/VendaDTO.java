package com.airton.farmacia.dto;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VendaDTO {
    private Long id;

    @NotNull(message = "O cliente é obrigatório")
    private Long clienteID;

    @NotNull(message = "A data de venda é obrigatória")
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime dataVenda;

    @NotNull(message = "O valor total é obrigatório ")
    private Double valorTotal;
}