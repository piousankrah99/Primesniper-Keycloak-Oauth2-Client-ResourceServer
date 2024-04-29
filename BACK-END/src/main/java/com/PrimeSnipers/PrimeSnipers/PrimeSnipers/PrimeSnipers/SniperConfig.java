//package com.PrimeSnipers.PrimeSnipers.PrimeSnipers;
//
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import java.util.List;
//
//@Configuration
//public class SniperConfig {
//
//    @Bean
//    @Autowired
//    CommandLineRunner commandLineRunner(SniperRepository repository) {
//        return args -> {
//            Snipers pious = new Snipers(
//                    "0248189134",
//                    99,
//                    100,
//                    ServiceType.MobilePrepaid,
//                    System.currentTimeMillis()
//                    );
//
//
//            Snipers sniper = new Snipers(
//                    "0273163806",
//                    47,
//                    7,
//                    ServiceType.MobilePostpaid,
//                    System.currentTimeMillis()
//            );
//
//            Snipers coldSniper = new Snipers(
//                    "0204314933",
//                    7,
//                    777,
//                    ServiceType.MobilePrepaid,
//                    System.currentTimeMillis()
//            );
//            Snipers PJaySniper = new Snipers(
//                    "979797",
//                    97979797,
//                    77799999,
//                    ServiceType.MobilePrepaid,
//                    System.currentTimeMillis()
//            );
//            repository.saveAll(List.of(pious, sniper, coldSniper, PJaySniper)); // Save the Snipers to the repository
//        };
//    }
//}
