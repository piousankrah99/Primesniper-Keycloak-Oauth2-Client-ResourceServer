import { Component, OnInit, inject } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { TodoService } from '../todos.service';
import { Todos } from '../Todos';
import { TaskCategory } from '../TaskCategory';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-to-do-application',
  templateUrl: './to-do-application.component.html',
  styleUrls: ['./to-do-application.component.css']
})


export class ToDoApplicationComponent {

  todos: Todos[] = []; // Initialize as an empty array
  doneTodos: Todos[] = [];
  formGroup!: FormGroup;
  formBuilder= inject(FormBuilder);

  taskCategory = Object.values(TaskCategory);
  selectedCategory!: TaskCategory;



  stlLogo: string = "assets/images/super_tech_logo.jpg"

  constructor(private todoService: TodoService, private http: HttpClient) {

    const savedDoneTodos = localStorage.getItem('doneTodos');
    this.doneTodos = savedDoneTodos ? JSON.parse(savedDoneTodos) : [];

  }


  ngOnInit() {

    this.getTodosList();
    this.formGroup = this.formBuilder.group({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      email: new FormControl(''),
      selectedCategory: new FormControl('', Validators.required),
      task: new FormControl(''),
      time: new FormControl(''),
      date: new FormControl(''),
      taskNotes: new FormControl(''),
      createdAt: new FormControl(''),

    })


    if (this.todos.length > 0) {
      this.fetchTodoData(this.todos[0].id);
    }
  }


  private getTodosList(): void {
    this.todoService.getTodosList().subscribe(
      (data: any) => {
        this.todos = data;
      },
      (error: any) => {
        // Handle the error here, for example:
        console.error('An error occurred while fetching todos: ', error);
      }
    );
  }

  onCategoryChange(): void {
    if (this.formGroup.valid) {
      this.selectedCategory = this.formGroup.get('selectedCategory')?.value;
      console.log('Selected Category:', this.selectedCategory);

      // Assuming you have a backend endpoint to handle category changes
      const endpoint = 'http://localhost:8082/Todos/addNewTodo';

      // Use this.selectedCategory directly in the request payload
      this.http.post(endpoint, { ...this.formGroup.value, taskCategory: this.selectedCategory })
        .subscribe(
          (response: any) => {
            console.log('Backend response:', response);
            // Handle the response from the backend if needed
          },
          (error: any) => {
            console.error('Error:', error);

            // Check if the error is due to a non-JSON response
            if (error instanceof HttpErrorResponse && error.status === 200) {
              // Handle the non-JSON response as text
              console.log('Non-JSON response:', error.error);
            } else {
              // Handle other errors
            }
          }
        );
    }
  }


  saveTodo() {
    if (this.formGroup.valid) {
      // Use this.selectedCategory directly
      const formData = {
        ...this.formGroup.value,
        taskCategory: this.selectedCategory,
      };

      console.log('Sending formData:', formData);

      this.todoService.addNewTodo(formData).subscribe(
        data => {
          this.getTodosList();
          console.log('Backend response:', data);
        },
        error => {
          console.error('Error:', error);

          // Check if the error is due to a non-JSON response
          if (error instanceof HttpErrorResponse && error.status === 200) {
            // Handle the non-JSON response as text
            console.log('Non-JSON response:', error.error);
          } else {
            // Handle other errors
          }
        }
      );
    }
  }


  confirmInsert(): void {
    const confirmation = window.confirm('Are you sure you want to Add this todo?');

    if (confirmation) {
      // User confirmed, proceed with deletion
      this.saveTodo();
      this.getTodosList(); // Refresh the todo list after Insertion

    }
  }



  confirmUpdate(id: number): void {
    const confirmation = window.confirm('Are you sure you want to Update this todo?');

    if (confirmation) {
      // User confirmed, proceed with deletion
      this.updateTodo(id);
    }
  }



  updateTodo(id: number){
    const formData = this.formGroup.value; // Get the form values
    // const id = formData.id; // Assuming you have an 'id' field in your form

    this.todoService.updateTodo(formData, id).subscribe(
      data => {
        console.log(data);
        this.getTodosList(); // Refresh the todo list after update

      },
      error => console.log("The error is", error)
    );
  }

  // onSubmit() {
  //   console.log(this.todos);
  //   this.saveTodo();
  // }

  confirmDelete(id: number): void {
    const confirmation = window.confirm('Are you sure you want to delete this todo?');

    if (confirmation) {
      // User confirmed, proceed with deletion
      this.deleteTodo(id);
    }
  }

  // confirmDoneDelete(id: number): void {
  //   const confirmation = window.confirm('Are you sure you want to delete this completed todo?');
  //
  //   if (confirmation) {
  //     // User confirmed, proceed with deletion
  //     this.deleteTodo(id);
  //   }
  // }

  confirmDone(id: number): void {
    const confirmation = window.confirm('Are you sure you want to confirm Done for this todo?');

    if (confirmation) {
      // User confirmed, proceed with deletion
      this.doneTodo(id);
    }
  }



  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(data => {
      console.log(data);
      this.getTodosList(); // Refresh the todo list after deletion
    });
  }


  doneTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => {
      const deletedItem = this.todos.find(item => item.id === id);
      if (deletedItem) {
        this.doneTodos.push(deletedItem);
        this.todos = this.todos.filter(item => item.id !== id);
        localStorage.setItem('doneTodos', JSON.stringify(this.doneTodos));
        this.getTodosList(); // Refresh the todo list after deletion


      }
    }, error => console.log(error));
  }


  confirmDoneDeleteFromLocalStorage(id: number): void {
    const confirmation = window.confirm('Are you sure you want to confirm Done Delete for this todo?');

    if (confirmation) {
      // User confirmed, proceed with deletion
      this.deleteFromLocalStorage(id);
    }
  }

  deleteFromLocalStorage(id: number) {
    this.doneTodos = this.doneTodos.filter(item => item.id !== id);
    localStorage.setItem('doneTodos', JSON.stringify(this.doneTodos));

    // Refresh the local storage list
    const savedDoneTodos = localStorage.getItem('doneTodos');
    this.doneTodos = savedDoneTodos ? JSON.parse(savedDoneTodos) : [];
  }

  // Add the fetchTodoData method to fetch data by ID
  fetchTodoData(id: number): void {
    if (id) {
      this.todoService.getTodoById(id).subscribe(
        (updatedData) => {
          console.log('DATA TO EDIT:', updatedData);

          // Update UI fields with the received data
          this.formGroup.patchValue({
            taskCategory: updatedData.taskCategory,
            task: updatedData.task,
            date: updatedData.date,
            time: updatedData.time,
            firstname: updatedData.firstname,
            lastname: updatedData.lastname,
            email: updatedData.email,
            taskNotes: updatedData.taskNotes,
            createdAt: updatedData.email

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
