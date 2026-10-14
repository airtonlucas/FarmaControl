package com.airton.farmacia.dto;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClienteDTO {
    private Long id;

    @NotBlank(message = "O nome do cliente é obrigatório")
    private String nome;

    @NotBlank(message = "O número do CPF é obrigatório")
    private String cpf;

    @NotBlank(message = "O número de Telefone é obrigatório")
    private String telefone;

    @NotBlank(message = "O Email é obrigatório")
    private String email;
}
