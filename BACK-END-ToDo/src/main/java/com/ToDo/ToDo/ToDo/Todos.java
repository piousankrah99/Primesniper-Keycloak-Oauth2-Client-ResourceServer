package com.ToDo.ToDo.ToDo;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalTime;

import java.time.LocalDate;


@Data
@Setter
@Getter
@Entity
@Builder
@AllArgsConstructor// automating the process of creating a constructor that sets all the fields...
public class Todos {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String task;

    @Enumerated(EnumType.STRING) // Specify how the enum values should be stored (as strings)
    @Column(name = "task_category")
    private TaskCategory taskCategory; // Use the enum type here


    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;


    @DateTimeFormat(pattern = "HH:mm")
    private  LocalTime time;

    private String taskNotes;


    private String firstname;
    private String lastname;
    private String email;
    private String password;

    @CreationTimestamp
    private LocalDate createdAt;
    @UpdateTimestamp
    private LocalDate updatedAt;

    private Long unixEpochMillis;


    public Todos() {
        this.unixEpochMillis = System.currentTimeMillis();
    }










}


