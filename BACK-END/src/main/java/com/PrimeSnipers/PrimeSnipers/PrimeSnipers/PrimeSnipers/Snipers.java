package com.PrimeSnipers.PrimeSnipers.PrimeSnipers.PrimeSnipers;

import jakarta.persistence.*;
import lombok.*;


@Data
@Setter
@Getter
@ToString
@Entity
@Builder
@Table(name = "snipers")
@AllArgsConstructor// automating the process of creating a constructor that sets all the fields...


public class Snipers {

    @Id
    @SequenceGenerator(
            name = "Snipers_sequence",
            sequenceName = "Snipers_sequence",
            allocationSize = 1
    )


    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "snipers_sequence"
    )
    private Long id;
    private String msisdn;
    private Integer customer_id_owner;
    private Integer customer_id_user;
    private String firstname;
    private String lastname;
    private String email;
    private ServiceType serviceType;
    @Getter
    private String password;





    @Column(name = "unix_epoch_millis")
    private Long unixEpochMillis;


    public Snipers() {
        this.unixEpochMillis = System.currentTimeMillis();
    }




}


