var userMap= new Map();                                                      // using hashmap to store users data 

$('#edit-box').hide();
$('#dataError').hide();
isError=false;
// -------------------------------------fetch all data -------------------------------------

// fetching data and storing in Map 
function fetchData(){
    $.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json", function (data) {
        // iterating over data 
        for (let user of data) {
            userMap.set(user.id,user);                               // adding doc in both map with id as key 
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        isError=true;
        console.log("Error thrown************************",errorThrown);
    });
}
fetchData();



// loading data 
function loadData(userMap){
    
    for (const [key, data] of userMap.entries()) {
        addNewRow(data);
    }
    $(document).ready( function () {
        $('#data-table').DataTable();
    } );
}

// this function extract details from json and display on ui
function addNewRow(data){
    let tableRow = document.createElement('tr'); // create one table row element and setting its inner html as json response
    tableRow.id = data.id;
    tableRow.innerHTML = (`
        <th scope="row"><input type="checkbox" class="select" id = ${data.id}></th> 
        <td id="n${data.id}">${data.name}</td>
        <td id="e${data.id}">${data.email}</td>
        <td id="r${data.id}">${data.role}</td>
        <td>
            <i onClick="edit_click('${data.id}')" class="fas fa-user-edit"></i>
            <i onClick="del_click('${data.id}')" class="fas fa-trash"></i>
        </td>
    `);
    document.getElementById('table-body').appendChild(tableRow); // adding all details to existing table
}

function loadTable(){
    let tableRow = document.createElement('table'); // create one table row element and setting its inner html as json response
    tableRow.id = "data-table";
    tableRow.classList="table table-sm";
    tableRow.innerHTML =(`
        <thead>
            <tr>
                <th scope="col"><label><input type="checkbox" id="select-all" onclick="selectAll()"><p>Select All</p></label></th> 
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody id="table-body"></tbody>
    `);
    document.getElementById('container').appendChild(tableRow);
}


// function to fetch all data and load to table
$("#fetch").click(function () {
    
    $("#get-users h1").html('All Users');
    $("#fetch").prop( "disabled", true );
    $('#animImg').hide();
    if(isError){
        $('#dataError').show();
        return;
    }
    
    loadData(userMap);
});
loadTable();