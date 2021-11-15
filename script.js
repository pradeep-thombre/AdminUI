// declaring variables
// using hashmap to store users data 
var userMap= new Map();
var tempMap=new Map();

var selectedItem=[];
var pageNum=1;
var editId;
$("#delete-select").hide();
// fetching data and storing in list 
function fetchData(){

    $("#bottomNav").empty();
    $.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json", function (data) {
            
            // iterating over data 
            for (let user of data) {
                // creating doc 
                var doc={
                    id:user.id,
                    name:user.name,
                    email:user.email,
                    role:user.role,
                }
                // adding doc in both map with id as key 
                userMap.set(user.id,doc);
                tempMap.set(user.id,doc);
            }
    });
}
fetchData();


// adding heading for each column in table
function addingTitles(){
    $("#users-table").append(`
    <tr>
            <th> </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th id="action">Actions</th>
    </tr>
`);
}


// loading data 
function loadData(tempuserMap,pageNums){
    var count=0;
    pages=1;

    // removing all items from table and navigation buton 
    $("#users-table").empty();
    $("#bottomNav").empty();

    // calling function to add title 
    addingTitles();
    $("#delete-select").show();
    // iterating over list 
    for (const [key, value] of tempuserMap.entries()) {
        
        if(count++%10==0){
            $("#bottomNav").append(`<p onClick="para_click('${pages}')">${pages++}</p>`);
        }


        // if count is in 10 * pagenum and next 9 elements

        // checking data 
        if(count>pageNums*10 && count<=(pageNums+1)*10){

            // adding to table
            $("#users-table").append(`
                <tr id="row-${key}">
                    <td>    
                        <label onClick="check_click('${key}')">
                            <input class="check" type="checkbox"  >
                            <span></span>
                        </label>
                    </td>
                    <td>${value.name}</td>
                    <td>${value.email}</td>
                    <td>${value.role}</td>
                    <td>
                        <i onClick="edit_click('${key}')" class="fas fa-user-edit"></i>
                        <i onClick="del_click('${key}')" class="fas fa-trash"></i>
                    </td>
                </tr>
            `);
        }
    }
}


// function to load data after searching text from input box 
function loadSearchedData(text){

    // empty the temp list as iterating again to insert data in tempMap 
    tempMap=new Map();
    pageNum=1;

    // iterating on map 
    for (const [key, value] of userMap.entries()) {

        // if text is present in name, role, email then adding to list 
        if((value.name).includes(text) ||(value.email).includes(text)||(value.role).includes(text)){
            tempMap.set(key,value);
        }
    }

    // reloading data in table 
    loadData(tempMap,0);
}

// function to handle para_click( bottom pafge numbers clicked)
function para_click(clicked_id){
    pageNum=clicked_id;
    loadData(tempMap,pageNum-1);
}

// function to handle check box clicked 
// adding ids of clicked element to selected itesm list 
function check_click(clicked_id){
    selectedItem.push(clicked_id);
}

$('#edit-box').hide();
function edit_click(clicked_id){
    console.log(clicked_id);
    $("#edit-box").show();
    $("#edit-name").val(tempMap.get(clicked_id).name);
    $("#edit-email").val(tempMap.get(clicked_id).email);
    $("#edit-role").val(tempMap.get(clicked_id).role);
    editId=tempMap.get(clicked_id).id;
}

// handling del application searching and deleting user
function del_click(clicked_id){

    tempMap.delete(clicked_id);
    // reloading data after delete 
    loadData(tempMap,0);
}

// searching data and reloading data 
$("#searchtext").keyup(function() {
    var text=$("#searchtext").val();
    loadSearchedData(text);
});



// function to fetch all data and load to table
$("#fetch").click(function () {
    $("#get-users #button").remove();
    $("#get-users h1").html('All Users');
    fetchData();
    loadData(userMap,0);
    
});

$("#update-button").click(function () {
    $('#edit-box').hide();

    var doc={
        id:editId,
        name:$("#edit-name").val(),
        email:$("#edit-email").val(),
        role:$("#edit-role").val(),
    }
    
    // pushing doc in bth list 
    userMap.set(editId,doc);
    tempMap.set(editId,doc);
    loadData(tempMap,pageNum-1);

});

// searching data and reloading data 
$("#search").click( function(){
    var text=$("#searchtext").val();
    loadSearchedData(text);
});

// handling delete select action 
$("#delete-select").click( function(){
    for (let user of selectedItem) {
        tempMap.delete(user);
    }
    // relaoding data 
    loadData(tempMap,0);

    // emptying the selectedItem list 
    selectedItem=[];

});


