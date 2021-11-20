var userMap= new Map();                                                      // using hashmap to store users data 
var tempMap=new Map();
var selectedItem=[];                                                         //list to store selected users

var pageNum=1;                                                               // declaring variables
var editId;


$("#delete-select").hide();                                                  //initially hiding unnecessary elements
$('#edit-box').hide();

// -------------------------------------fetch all data -------------------------------------

// fetching data and storing in list 
function fetchData(){
    $("#bottomNav").empty();
    $.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json", function (data) {
            
            // iterating over data 
            for (let user of data) {

                
                var doc={                                                   // creating doc 
                    id:user.id,
                    name:user.name,
                    email:user.email,
                    role:user.role,
                }
                
                userMap.set(user.id,doc);                                  // adding doc in both map with id as key 
                tempMap.set(user.id,doc);
            }
    });
}
fetchData();



// loading data 
function loadData(tempuserMap,pageNums){
    var count=0;
    pages=1;
 
    $("#users-table").empty();                                          // removing all items from table and navigation buton
    $("#bottomNav").empty();

    addingTitles();                                                     // calling function to add title to table
    $("#delete-select").show();
    for (const [key, value] of tempuserMap.entries()) {                 // iterating over list 
        if(count++%10==0){
            $("#bottomNav").append(`<p onClick="para_click('${pages}')">${pages++}</p>`);
        }
        
        if(count>pageNums*10 && count<=(pageNums+1)*10){                // if count is in 10 * pagenum and next 9 elements

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

    tempMap=new Map();                                                // empty the temp list as iterating again to insert data in tempMap 
    pageNum=1;

    // iterating on map 
    for (const [key, value] of userMap.entries()) {

        // if text is present in name, role, email then adding to list 
        if((value.name).includes(text) ||(value.email).includes(text)||(value.role).includes(text)){
            tempMap.set(key,value);
        }
    }
 
    loadData(tempMap,0);                                             // reloading data in table
}