
// ----------------------------------functions -----------------------------------------


// function to fetch all data and load to table
$("#fetch").click(function () {
    $("#get-users #button").remove();
    $("#get-users h1").html('All Users');
    fetchData();
    loadData(userMap,0);
    
});



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


function edit_click(clicked_id){
    console.log(clicked_id);
    $("#edit-box").show();
    $("#edit-name").val(tempMap.get(clicked_id).name);
    $("#edit-email").val(tempMap.get(clicked_id).email);
    $("#edit-role").val(tempMap.get(clicked_id).role);
    editId=tempMap.get(clicked_id).id;
}

// handling del click and reloading data
function del_click(clicked_id){
    tempMap.delete(clicked_id);
    loadData(tempMap,0);
}



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
