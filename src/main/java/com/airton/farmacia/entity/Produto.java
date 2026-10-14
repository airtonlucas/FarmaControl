package com.airton.farmacia.entity;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "produto")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;
    private String categoria;

    @Column(nullable = false)
    private double preco;

    @Column(name = "quantidade_estoque")
    private Integer quantidadeEstoque;

    @Column(name = "data_validade")
    private LocalDate dataValidade;

    @Column(name = "codigo_barras", unique = true,nullable = false)
    private String codigoBarras;

    @ManyToOne
    @JoinColumn(name = "fornecedor")
    private Fornecedor fornecedor;
}