// declaring variables
var userList= [];
var tempList=[];
var selectedItem=[];
var pageNum=1;

// fetching data and storing in list 
function fetchData(){
    tempList=[];
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
                // pushing doc in bth list 
                userList.push(doc);
                tempList.push(doc);
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
function loadData(tempUserList,num){
    var count=0;
    pages=1;

    // removing all items from table and navigation buton 
    $("#users-table").empty();
    $("#bottomNav").empty();

    // calling function to add title 
    addingTitles();
    
    // iterating over list 
    for (let user of tempUserList) {

        
        if(count++%10==0){
            $("#bottomNav").append(`<p onClick="para_click('${pages}')">${pages++}</p>`);
        }


        // if count is in 10 * pagenum and next 9 elements

        // checking data 
        if(count>num*10 && count<=(num+1)*10){

            // adding to table
            $("#users-table").append(`
                <tr id="row-${user.id}">
                    <td>    
                        <label onClick="check_click('${user.id}')">
                            <input class="check" type="checkbox"  >
                            <span></span>
                        </label>
                    </td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.role}</td>
                    <td>
                        <i class="fas fa-user-edit"></i>
                        <i onClick="del_click('${user.id}')" class="fas fa-trash"></i>
                    </td>
                </tr>
            `);
        }
    }
}


// function to load data after searching text from input box 
function loadSearchedData(text){

    // empty the temp list as iterating again to insert data in templist 
    tempList=[];
    pageNum=1;

    // iterating on list 
    for (let user of userList) {

        // if text is present in name, role, email then adding to list 
        if((user.name).includes(text) ||(user.email).includes(text)||(user.role).includes(text)){
            tempList.push(user);
        }
    }

    // reloading data in table 
    loadData(tempList,0);
}

// function to handle para_click( bottom pafge numbers clicked)
function para_click(clicked_id){
    pageNum=clicked_id-1;
    loadData(tempList,pageNum);
}

// function to handle check box clicked 
// adding ids of clicked element to selected itesm list 
function check_click(clicked_id){
    selectedItem.push(clicked_id);
}



// handling del application searching and deleting user
function del_click(clicked_id){
    let userIndex=tempList.findIndex(user => user.id == clicked_id);
    tempList.splice(userIndex,1);

    // reloading data after delete 
    loadData(tempList,0);
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
    loadData(userList,0);
    
});

// searching data and reloading data 
$("#search").click( function(){
    var text=$("#searchtext").val();
    loadSearchedData(text);
});

// handling delete select action 
$("#delete-select").click( function(){

    // ieterating over list in reverse order 
    for (var i = tempList.length - 1; i >= 0; i--) {
        let user=tempList[i];

        // if user id is present in selectedItem list then appliying splice function on it. 
        
        if(selectedItem.includes(user.id)){
            let userIndex=tempList.findIndex(data => data == user);
            tempList.splice(userIndex,1);
        }
    }

    // relaoding data 
    loadData(tempList,0);

    // emptying the selectedItem list 
    selectedItem=[];

});


