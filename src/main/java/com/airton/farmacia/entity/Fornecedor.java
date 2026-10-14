package com.airton.farmacia.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "fornecedor")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Fornecedor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;
    private String cnpj;
    private String telefone;
    private String email;
}
