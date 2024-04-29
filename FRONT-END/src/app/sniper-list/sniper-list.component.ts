import { Component, OnInit, inject } from '@angular/core';
import { Snipers } from '../Snipers';
import { SniperService } from '../snipers.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sniper-list',

  styleUrls: ['./sniper-list.component.css'],

  templateUrl: './sniper-list.component.html',
})


export class SniperListComponent implements OnInit {
  snipers: Snipers[] = []; // Initialize as an empty array
  formGroup!: FormGroup;
  formBuilder= inject(FormBuilder);

  stlLogo: string = "assets/images/super_tech_logo.jpg"

  constructor(private sniperService: SniperService,  private router: Router) {}

  ngOnInit() {

    this.getSnipersList();
    this.formGroup = this.formBuilder.group({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      email: new FormControl(''),
      msisdn: new FormControl(''),
      customer_id_user: new FormControl(''),
      customer_id_owner: new FormControl(''),
      service_type: new FormControl('')

    })

    if (this.snipers.length > 0) {
      this.fetchSniperData(this.snipers[0].id);
    }

  }

  private getSnipersList() {
    this.sniperService.getSnipersList().subscribe(data => {
      this.snipers = data;
    });
  }

  // saveSniper() {
  //   this.sniperService.addNewSniper(this.formGroup).subscribe(
  //       data => {
  //         console.log(data);
  //       },
  //       error => console.log("The error is", error)
  //   );
  // }

  projects(){
    this.router.navigate(['/projects']);

  }

  confirmInsert(): void {
    const confirmation = window.confirm('Are you sure you want to Add this sniper?');

    if (confirmation) {
      // User confirmed, proceed with deletion
      this.saveSniper();
    }
  }

  saveSniper() {
    const formData = this.formGroup.value; // Get the form values
    this.sniperService.addNewSniper(formData).subscribe(
      data => {
        console.log(data);
        this.getSnipersList(); // Refresh the sniper list after deletion

      },
      error => console.log("The error is", error)
    );
    this.getSnipersList(); // Refresh the sniper list after deletion

  }

  confirmUpdate(id: number): void {
    const confirmation = window.confirm('Are you sure you want to Update this sniper?');

    if (confirmation) {
      // User confirmed, proceed with deletion
      this.updateSniper(id);
    }
  }



  updateSniper(id: number){
    const formData = this.formGroup.value; // Get the form values
    // const id = formData.id; // Assuming you have an 'id' field in your form

    this.sniperService.updateSniper(formData, id).subscribe(
    data => {
  console.log(data);
      this.getSnipersList(); // Refresh the sniper list after update

    },
error => console.log("The error is", error)
);
    this.getSnipersList(); // Refresh the sniper list after update

  }

  // onSubmit() {
  //   console.log(this.snipers);
  //   this.saveSniper();
  // }

  confirmDelete(id: number): void {
    const confirmation = window.confirm('Are you sure you want to delete this sniper?');

    if (confirmation) {
      // User confirmed, proceed with deletion
      this.deleteSniper(id);
    }
  }

  deleteSniper(id: number) {
    this.sniperService.deleteSniper(id).subscribe(data => {
      console.log(data);
      this.getSnipersList(); // Refresh the sniper list after deletion
    });
  }


  // Add the fetchSniperData method to fetch data by ID
  fetchSniperData(id: number): void {
    if (id) {
      this.sniperService.getSniperById(id).subscribe(
        (updatedData) => {
          console.log('DATA TO EDIT:', updatedData);

          // Update UI fields with the received data
          this.formGroup.patchValue({
            msisdn: updatedData.msisdn,
            customer_id_owner: updatedData.customer_id_owner,
            customer_id_user: updatedData.customer_id_user,
            service_type: updatedData.service_type,
            firstname: updatedData.firstname,
            lastname: updatedData.lastname,
            email: updatedData.email,
            // Add more fields if needed
          });

          // Optional: Trigger Angular change detection
          this.formGroup.updateValueAndValidity();
        },
        (error) => {
          console.error('FETCHING error:', error);
          // Handle errors if needed
        }
      );
    }
  }


}
