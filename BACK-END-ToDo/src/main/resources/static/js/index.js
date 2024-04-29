    console.log("checking for this, first time")
    let count = /*[[${totalCount}]]*/ '';
    let subscriberCount = /*[[${subscriberCount}]]*/ '';
    // console.log("checking for this")
    console.log("count",count)
    console.log("subscriberCount",subscriberCount)


    $(document).ready(function () {
    $.noConflict();
    console.log("Paginate Data Table")
    $('#example').DataTable({
    select:true
});
});


    function openDetailsModal() {
    document.getElementById("detailsModal").style.display = "block";
}


    function openInsertModal() {
    document.getElementById("insertModal").style.display = "block";
}

    function closeInsertModal() {
    document.getElementById("insertModal").style.display = "none";
}


    function closeUpdateModal() {
    document.getElementById("updateModal").style.display = "none";
}

    function closeDetailsModal() {
    document.getElementById("detailsModal").style.display = "none";
}


    function closeStatisticsModal() {
    document.getElementById("statisticsModal").style.display = "none";
}



<!--INSERT-->
    function insertTodo(event) {
    event.preventDefault(); // Prevent the default form submission

    // Create a JavaScript object with the form data
    let subscriberData = {
    task: document.getElementById('insert_task').value,
    date: document.getElementById('insert_date').value,
    time: document.getElementById('insert_time').value,
    firstname: document.getElementById('insert_firstname').value,
    lastname: document.getElementById('insert_lastname').value,
    email: document.getElementById('insert_email').value,
    // Add more fields as needed
};

    // Send the data as a JSON request to the Spring Boot controller
    fetch('/Todos/addNewTodo', { // Corrected URL
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
},
    body: JSON.stringify(subscriberData)
})
    .then(function(response) {
    if (response.ok) {
    // Handle success here, e.g., show a success message
    alert('Todo added successfully');
} else {
    // Handle errors here, e.g., show an error message
    alert('Todo already Exists');
}
})
    .catch(function(error) {
    // Handle network errors here
    console.error('Error:', error);
});

    //Update UI with new todo

    // Create a new row for the table
    let newRow = document.createElement('tr');

    // Create table cells for each field
    let idCell = document.createElement('td');
    let taskCell = document.createElement('td');
    let customerOwnerIdCell = document.createElement('td');
    let customerUserIdCell = document.createElement('td');
    let firstnameCell = document.createElement('td');
    let lastnameCell = document.createElement('td');
    let emailCell = document.createElement('td');

    // Populate the cells with values from the form

    taskCell.textContent = document.getElementById('insert_task').value;
    customerOwnerIdCell.textContent = document.getElementById('insert_date').value;
    customerUserIdCell.textContent = document.getElementById('insert_time').value;
    firstnameCell.textContent = document.getElementById('insert_firstname').value;
    lastnameCell.textContent = document.getElementById('insert_lastname').value;
    emailCell.textContent = document.getElementById('insert_email').value;
    // Note: For security reasons, you shouldn't populate the password field here.

    // Append the cells to the new row
    newRow.appendChild(idCell);
    newRow.appendChild(taskCell);
    newRow.appendChild(customerOwnerIdCell);
    newRow.appendChild(customerUserIdCell);
    newRow.appendChild(firstnameCell);
    newRow.appendChild(lastnameCell);
    newRow.appendChild(emailCell);
    // Note: You should not append the password field to the table for security reasons.

    // Append the new row to the table
    let tableBody = document.getElementById('subscriberTableBody');
    tableBody.appendChild(newRow);

    // Optionally, you can clear the form fields after insertion
    document.getElementById('insert_task').value = '';
    document.getElementById('insert_date').value = '';
    document.getElementById('insert_time').value = '';
    document.getElementById('insert_firstname').value = '';
    document.getElementById('insert_lastname').value = '';
    document.getElementById('insert_email').value = '';

}


<!-- Add this script to your HTML file -->
    function openUpdateModal() {
    document.getElementById("updateModal").style.display = "block";

    let myBtn = document.querySelectorAll(".EditBtn");

    myBtn.forEach(btn => {
    btn.addEventListener("click", function () {
    let tableRow = $(this).closest("tr");

    let id = $(tableRow).find('td:eq(0)').text();
    let task = $(tableRow).find('td:eq(1)').text();
    let date = $(tableRow).find('td:eq(2)').text();
    let time = $(tableRow).find('td:eq(3)').text();
    let firstname = $(tableRow).find('td:eq(4)').text();
    let lastname = $(tableRow).find('td:eq(5)').text();
    let email = $(tableRow).find('td:eq(6)').text();
    let password = $(tableRow).find('td:eq(7)').text(); // Assuming you have a password field
    let role = $(tableRow).find('td:eq(8)').text(); // Assuming you have a role field

    console.log("The table row has ID:", id);
    $("#id").val(id);
    $("#taskVal").val(task);
    $("#dateVal").val(date);
    $("#timeVal").val(time);
    $("#firstnameVal").val(firstname);
    $("#lastnameVal").val(lastname);
    $("#emailVal").val(email);
    $("#passwordVal").val(password); // Assuming you have a password field
    $("#roleVal").val(role); // Assuming you have a role field


    if(id){
    $.ajax({
    url: `http://localhost:8081/Todos/${id}`,
    type: "get",
    contentType: "application/json",
    headers: {
    "X-HTTP-Method-Override": "GET" // Use custom header to indicate "PUT" request
},
    success: function(updatedData) {

    console.log("DATA TO  EDIT:", updatedData);

    $("#taskVal").val(updatedData.task);
    $("#dateVal").val(updatedData.date);
    $("#timeVal").val(updatedData.time);
    $("#firstnameVal").val(updatedData.firstname);
    $("#lastnameVal").val(updatedData.lastname);
    $("#emailVal").val(updatedData.email);
    $("#roleVal").val(updatedData.role); // Assuming you have a role field

    // You can also update the UI with the new data if needed
},
    error: function(error) {
    console.error("FETCHING  error:", error);
    // Handle errors if needed
}
});
}

})
})}


    let submitBtn = document.querySelector("#submitUpdatedData")

    submitBtn.addEventListener("click",function (event){

    event.preventDefault(); // Prevent default form submission

    let id = $('#id').val();
    let task = $("#taskVal").val();
    let dateVal = $("#dateVal").val();
    let timeVal = $("#timeVal").val();
    let firstname = $("#firstnameVal").val();
    let lastname = $("#lastnameVal").val();
    let email = $("#emailVal").val();
    let password = $("#passwordVal").val(); // Assuming you have a password field
    let role = $("#roleVal").val(); // Assuming you have a role field

    let dataSet = {
    "id": id,
    "task": task,
    "date": dateVal,
    "time": timeVal,
    "firstname": firstname,
    "lastname": lastname,
    "email": email,
    "password": password, // Assuming you have a password field
    "role": role // Assuming you have a role field
};


    alert(JSON.stringify(dataSet))



    $.ajax({
    url: `http://localhost:8081/Todos/update/${id}`,
    type: "PUT",
    contentType: "application/json",
    headers: {
    "X-HTTP-Method-Override": "PUT"
},
    data: JSON.stringify(dataSet),
    success: function(dataSet) {

    console.log("Update successful:", dataSet);
    location.reload()
    // closeUpdateModal(); // Close the modal after successful update
    // You can also update the UI with the new data if needed
    $("#task").val(dataSet.task);
    $("#date").val(dataSet.date);
    $("#time").val(dataSet.time);
    $("#firstname").val(dataSet.firstname);
    $("#lastname").val(dataSet.lastname);
    $("#email").val(dataSet.email);
    $("#password").val(dataSet.password); // Assuming you have a password field
    $("#role").val(dataSet.role); // Assuming you have a role field

    // Handle errors if needed
},

    error: function(error) {
    console.error(error);
    alert("Failed to Update Todo");

    $("#task").val(dataSet.task)
    $("#firstname").val(dataSet.firstname);
    $("#lastname").val(dataSet.lastname);
    $("#email").val(dataSet.email);

}

});

    closeUpdateModal(); // Close the modal after successful update

})




    let myDetailsBtn = document.querySelectorAll(".DetailsBtn");

    myDetailsBtn.forEach(btn => {
    btn.addEventListener("click", function () {
        let tableRow = this.closest("tr");

        let idDetails = tableRow.cells[0].textContent;
        let taskDetailsVal = tableRow.cells[1].textContent;
        let dateDetailsVal = tableRow.cells[2].textContent;
        let timeDetailsVal = tableRow.cells[3].textContent;
        let firstnameDetailsVal = tableRow.cells[5].textContent;
        let lastnameDetailsVal = tableRow.cells[6].textContent;
        let emailDetailsVal = tableRow.cells[7].textContent;
        let passwordDetailsVal = tableRow.cells[8].textContent; // Assuming you have a password field
        let roleDetailsVal = tableRow.cells[9].textContent; // Assuming you have a role field
        let unixEpochMillisDetailsVal = tableRow.cells[10].textContent; // Assuming you have an additional field

        let dataSet = {
            "id": idDetails,
            "task": taskDetailsVal,
            "date": dateDetailsVal,
            "time": timeDetailsVal,
            "firstname": firstnameDetailsVal,
            "lastname": lastnameDetailsVal,
            "email": emailDetailsVal,
            "password": passwordDetailsVal, // Assuming you have a password field
            "role": roleDetailsVal, // Assuming you have a role field
            "unixEpochMillis": unixEpochMillisDetailsVal // Assuming you have an additional field
        };


        console.log("The Table Row ID is:",idDetails)

        console.log("The Todo Data is: ",dataSet)

        $("#idDetails").text(dataSet.id)
        $("#taskDetailsVal").text(dataSet.task)
        $("#firstnameDetailsVal").text(dataSet.firstname)
        $("#lastnameDetailsVal").text(dataSet.lastname)
        $("#emailDetailsVal").text(dataSet.email)
        $("#dateDetailsVal").text(dataSet.date)
        $("#timeDetailsVal").text(dataSet.time)


        if(idDetails){

            console.log("PJaySniper is at STL");

        }




    })
})




    function openStatisticsModal() {
    document.getElementById("statisticsModal").style.display = "block";

    $.ajax({
    type: "GET",
    url: "http://localhost:8081/Todos/stats", // The URL of your controller endpoint
    success: function(data) {
    // Access properties directly from the 'data' object
    var totalCount = data.totalCount;

    // Update HTML elements with the received values
    $("#totalCount").text(totalCount);
},
    error: function(xhr, status, error) {
    console.error("Error fetching todo statistics: " + error);
}
});
}

    // Call the function when the page loads



<!-- Delete Code -->


    $(".DeleteBtn").click(function() {
    let id = $(this).closest("tr").find("td:eq(0)").text();
    // Now 'id' contains the value of the 'data-id' attribute of the clicked button

    event.preventDefault();
    console.log("PJaySniper is at STL");

    let tableRow = $(this).closest("tr");

    // Ask for confirmation before deleting
    if (id) {
    // Proceed with the AJAX request

    if (window.confirm('Are you sure you want to delete this item?')) {
    $.ajax({
    url: `http://localhost:8081/Todos/${id}`,
    type: 'DELETE',
    success: function () {
    console.log('Todo deleted successfully');
    tableRow.remove();
    // Find and remove the todo element by its ID
    // let subscriberId = url.split('/').pop(); // Extract the ID from the URL
    // $('#todo' + subscriberId).remove(); // Remove the UI element

},
    error: function () {
    console.log('Failed to delete todo');
    // Optional: Show an error message to the user
}
});
}} });


