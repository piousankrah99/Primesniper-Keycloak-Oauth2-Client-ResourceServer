package com.ToDo.ToDo.ToDo;


import java.util.Collections;
import java.util.List;
import java.util.Map;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping(path = "/Todos")
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
public class TodoController {

    private final TodoService todoService;


    @GetMapping("/toDo")
    public String listTodos(Model model) {


        model.addAttribute("todos", todoService.getAllTodos());
        return "toDo"; // Assuming you have a "toDo.html" template
    }

 @GetMapping("/toDos")
    @ResponseBody // This annotation tells Spring to directly return the data as the response body
    public List<Todos> toDos() {


     return todoService.getAllTodos();
    }


    @GetMapping("/{id}")
    @ResponseBody
    public Todos getTodo(@PathVariable("id") Long id){

        return todoService.getTodoById(id);
    }

    @GetMapping("/oneTodo")
    @ResponseBody
    public ResponseEntity<Todos> getTodoByTask(@RequestParam String task) {
        Todos todo = todoService.getTodoByTask(task);

        if (todo != null) {
            return ResponseEntity.ok(todo);
        } else {
            return  ResponseEntity.notFound().build();
        }
    }

//

    @GetMapping("/displayImage")
    public String displayImage(Model model) {
        String imageUrl = "/images/super_tech_logo.jpg"; // Path to the image in the static directory
        model.addAttribute("imageUrl", imageUrl);
        return "toDo";
    }

    // Other endpoint mappings and methods...


    @PostMapping("/addNewTodo")
    public ResponseEntity<Map<String, String>> addNewTodo(@RequestBody Todos newTodo) {
        log.info("add new todo");
        log.info("Received Todo: " + newTodo.toString());

        TaskCategory selectedCategory = newTodo.getTaskCategory();
        log.info("Selected Category: " + selectedCategory);

        // Check if a todo with the same Task already exists
        if (todoService.isTaskAlreadyExists(newTodo.getTask())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Collections.singletonMap("error", "Task already exists"));
        }

        // If no duplicate, proceed with adding the new todo
        todoService.addNewTodo(newTodo);

        // Modify the response to return a JSON object with a success message
        String successMessage = "Todo added successfully";
        Map<String, String> responseBody = Collections.singletonMap("message", successMessage);

        return ResponseEntity.ok(responseBody);
    }




    @GetMapping("/updateTodoForm/{id}")
    public String showUpdateTodoForm(@PathVariable("id") Long id, Model model) {


        model.addAttribute("todo", todoService.getTodoId(id));


        return "toDo";
    }


    @PutMapping("/update/{id}")
    public String updateTodo(@PathVariable("id")Long id, @RequestBody Todos todo, Model model) {

        model.addAttribute("todo", todo);


            Todos existingTodo = todoService.findById(id);
            existingTodo.setTaskCategory(todo.getTaskCategory());
            existingTodo.setTask(todo.getTask());
            existingTodo.setTime(todo.getTime());
            existingTodo.setDate(todo.getDate());
            existingTodo.setTaskNotes(todo.getTaskNotes());
            existingTodo.setFirstname(todo.getFirstname());
            existingTodo.setLastname(todo.getLastname());
            existingTodo.setEmail(todo.getEmail());
            existingTodo.setPassword(todo.getPassword());


        todoService.updateTodo(existingTodo);
            return "toDo";
        }


    @PostMapping("/doneTodo")
    public ResponseEntity<String> doneTodo(@RequestBody Todos newTodo) {
        log.info("add new todo");
        // Check if a todo with the same Task already exists
        if (todoService.isTaskAlreadyExists(newTodo.getTask())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Task already exists");
        }

        // If no duplicate, proceed with adding the new todo
        todoService.addNewTodayTodo(newTodo);
        return ResponseEntity.ok("Todo added successfully");
    }

    @GetMapping("/detailsModal/{id}")
    public String showDetailModal(@PathVariable("id") Long id, Model model) {

        model.addAttribute("subscriberDetails", todoService.getTodoId(id));

        return "toDo";
    }


        //Delete
        @DeleteMapping("/{id}")
        public ResponseEntity<String> deleteTodos (@PathVariable Long id){
            try {
                todoService.deleteTodo(id);
                return ResponseEntity.ok().build();
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

    @GetMapping("/stats")
    public ResponseEntity<TodoCount> getStats() {
        long count = todoService.countTodos();

        TodoCount subscriberCount = TodoCount.builder()
                .totalCount(count)
                .build();

        // Return the subscriberCount as a JSON response
        return ResponseEntity.ok(subscriberCount);
    }



        @DeleteMapping("/deleteAll")
        public void deleteAllTodos () {
            todoService.deleteAllTodos();
        }




}
