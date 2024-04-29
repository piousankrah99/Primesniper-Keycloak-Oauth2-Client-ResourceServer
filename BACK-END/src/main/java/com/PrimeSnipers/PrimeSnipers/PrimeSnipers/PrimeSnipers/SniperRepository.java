package com.PrimeSnipers.PrimeSnipers.PrimeSnipers.PrimeSnipers;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;

@Repository
public interface SniperRepository extends JpaRepository<Snipers, Long> {

    @Query("SELECT s FROM Snipers s WHERE s.msisdn = ?1")
    Optional<Snipers> findByMsisdn(String msisdn);

    void deleteAllById(Long Id);

    List<Snipers> findByMsisdnContaining(String msisdn);


    Optional<Snipers> findByEmail(String email);


    long countByServiceType(ServiceType serviceType);



}
