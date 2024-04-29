package com.PrimeSnipers.PrimeSnipers.PrimeSnipers.PrimeSnipers;


import java.util.List;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping(path = "/Snipers")
@Slf4j
@CrossOrigin(origins = "*")
public class SniperController {

    private final SniperService sniperService;



    @GetMapping("/primeSniper")
    public String listSnipers(Model model) {

        model.addAttribute("sniper", new Snipers());

        model.addAttribute("snipers", sniperService.getAllSnipers());
        return "primeSniper"; // Assuming you have a "primeSniper.html" template
    }


    @GetMapping("/login")
    public String sniperLogin(Model model) {


        return "login"; // Assuming you have a "primeSniper.html" template
    }

 @GetMapping("/primeSnipers")
    @ResponseBody // This annotation tells Spring to directly return the data as the response body
    public List<Snipers> primeSnipers(Model model) {
     model.addAttribute("sniper", new Snipers());

     return sniperService.getAllSnipers();
    }


    @GetMapping("/{id}")
    @ResponseBody
    public Snipers getSniper(@PathVariable("id") Long id, Model model){
        model.addAttribute("sniper", new Snipers());

        return sniperService.getSniperById(id);
    }

    @GetMapping("/onePrimeSniper")
    @ResponseBody
    public ResponseEntity<Snipers> getSniperByMsisdn(@RequestParam String msisdn) {
        Snipers sniper = sniperService.getSniperByMsisdn(msisdn);

        if (sniper != null) {
            return ResponseEntity.ok(sniper);
        } else {
            return  ResponseEntity.notFound().build();
        }
    }

//

    @GetMapping("/displayImage")
    public String displayImage(Model model) {
        String imageUrl = "/images/super_tech_logo.jpg"; // Path to the image in the static directory
        model.addAttribute("imageUrl", imageUrl);
        return "primeSniper";
    }

    // Other endpoint mappings and methods...

    @PostMapping("/addNewSniper")
    public ResponseEntity<String> addNewSniper(@RequestBody Snipers newSniper) {
        // Check if a sniper with the same MSISDN already exists
        if (sniperService.isMSISDNAlreadyExists(newSniper.getMsisdn())) {
            sniperService.addNewSniper(newSniper);

            return ResponseEntity.status(HttpStatus.CONFLICT).body("MSISDN already exists");
        }

        // If no duplicate, proceed with adding the new sniper
        sniperService.addNewSniper(newSniper);
        return ResponseEntity.ok("Sniper added successfully");
    }


    @GetMapping("/updateSniperForm/{id}")
    public String showUpdateSniperForm(@PathVariable("id") Long id, Model model) {


        model.addAttribute("sniper", sniperService.getSniperId(id));


        return "primeSniper";
    }


    @PutMapping("/update/{id}")
    public String updateSniper(@PathVariable("id")Long id, @RequestBody Snipers sniper, Model model) {

        model.addAttribute("sniper", sniper);


            Snipers existingSniper = sniperService.findById(id);
            existingSniper.setMsisdn(sniper.getMsisdn());
            existingSniper.setCustomer_id_user(sniper.getCustomer_id_user());
            existingSniper.setCustomer_id_owner(sniper.getCustomer_id_owner());
            existingSniper.setServiceType(sniper.getServiceType());
            existingSniper.setFirstname(sniper.getFirstname());
            existingSniper.setLastname(sniper.getLastname());
            existingSniper.setEmail(sniper.getEmail());
            existingSniper.setPassword(sniper.getPassword());


        sniperService.updateSniper(existingSniper);
            return "primeSniper";
        }


    @GetMapping("/detailsModal/{id}")
    public String showDetailModal(@PathVariable("id") Long id, Model model) {

        model.addAttribute("sniperDetails", sniperService.getSniperId(id));

        return "primeSniper";
    }


        //Delete
        @DeleteMapping("/{id}")
        public ResponseEntity<String> deleteSnipers (@PathVariable Long id){
            try {
                sniperService.deleteSniper(id);
                return ResponseEntity.ok().build();
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

    @GetMapping("/stats")
    public ResponseEntity<SniperCount> getStats() {
        long count = sniperService.countSnipers();
        long countPrepaid = sniperService.countSnipersPrepaid();
        long countPostpaid = sniperService.countSnipersPostpaid();

        SniperCount sniperCount = SniperCount.builder()
                .totalCount(count)
                .totalPrepaidCount(countPrepaid)
                .totalPostpaidCount(countPostpaid)
                .build();

        // Return the sniperCount as a JSON response
        return ResponseEntity.ok(sniperCount);
    }



        @DeleteMapping("/deleteAll")
        public void deleteAllSnipers () {
            sniperService.deleteAllSnipers();
        }


}
