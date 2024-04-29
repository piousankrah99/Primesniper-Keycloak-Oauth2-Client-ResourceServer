package com.PrimeSnipers.PrimeSnipers.PrimeSnipers.PrimeSnipers;


import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class SniperService {



    private final SniperRepository sniperRepository;

    private NamedParameterJdbcTemplate jdbcTemplate;


    public List<Snipers> getSnipers() {
       return sniperRepository.findAll();
    }

//Search Snipers by MSISDN
    public List<Snipers> searchSnipersByMsisdn(String msisdn) {
        return sniperRepository.findByMsisdnContaining(msisdn);
    }


    //Change Plan Type



    public void addNewSniper(Snipers newSniper) {
        Optional<Snipers> existingSniperOptional = 
            sniperRepository.findByMsisdn(newSniper.getMsisdn());
    

        Snipers savedSniper = sniperRepository.save(newSniper);
    
        System.out.println("New sniper added: " + savedSniper);
    }
    

@Transactional
    //Delete Snipers
    public void deleteSniper(Long SnipersId){
        boolean exists = sniperRepository.existsById(SnipersId);
        if (!exists){
            throw new IllegalStateException(
                "Snipers with id " + SnipersId + "does not exists");
        }
        sniperRepository.deleteById(SnipersId);
    }

    public void deleteAllSnipers(){
        sniperRepository.deleteAll();
    }


    //Return All Snipers

    public List<Snipers> getAllSnipers() {
        return sniperRepository.findAll();
    }

    @Transactional
    public Snipers getSniperByMsisdn(String msisdn) {
        Optional<Snipers> sniper = sniperRepository.findByMsisdn(msisdn);
        return sniper.orElse(null);
    }


    public void updateSniper(Snipers sniper) {
        sniperRepository.save(sniper);
    }


    public Snipers getSniperById(Long id) {
        Optional<Snipers> sniperOptional = sniperRepository.findById(id);
        return sniperOptional.orElse(null);
    }


    public Snipers getSniperId(Long id) {
      return sniperRepository.findById(id).get();
    }


    public boolean isMSISDNAlreadyExists(String msisdn) {
        // Implement the logic to check if a sniper with the given MSISDN already exists
        Optional<Snipers> existingSniper = sniperRepository.findByMsisdn(msisdn);
        return existingSniper.isPresent();
    }

    public Snipers findById(Long id) {
                return sniperRepository.findById(id).get();

            }

    public long countSnipers(){
        return sniperRepository.count();
    }

    public long countSnipersPrepaid() {
        return sniperRepository.countByServiceType(ServiceType.MobilePrepaid);

    }

    public long countSnipersPostpaid() {
        return sniperRepository.countByServiceType(ServiceType.MobilePostpaid);

    }


}    

