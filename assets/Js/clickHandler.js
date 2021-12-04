

// -------------------------------------click listeners ----------------------------------------

$("#update-button").click(function () {
    $('#edit-box').hide();
    var doc={
        id:editId,
        name:$("#edit-name").val(),
        email:$("#edit-email").val(),
        role:$("#edit-role").val(),
    }
    userMap.set(editId,doc);
    $('#e'+editId).html(doc.email);
    $('#n'+editId).html(doc.name);
    $('#r'+editId).html(doc.role);
});


$("#delete-all-btn").click( function(){
    const select = document.getElementsByClassName('select');
    for(let i=select.length-1;i>=0; i--){
        if(select[i].checked == true){ // it will check checked box is checked or not
            let id = select[i].id; //if checked then
            delRow(id); // it will send id of checked box to delete function
        }
    }
    reloadtable();
});


function selectAll() {
    console.log(document.getElementById('select-all'));
    const select = document.getElementsByClassName('select');
    console.log(select)
    isChecked=false;
    if(document.getElementById('select-all').checked == true){   // when we click on select all button it will run a loop on all 
        isChecked=true;
    }
    for(let i = 0; i < select.length; i++){   
        select[i].checked = isChecked;
    }

}

// ----------------------------------functions -----------------------------------------



function edit_click(clicked_id){
    $("#edit-box").show();
    $("#edit-name").val(userMap.get(clicked_id).name);
    $("#edit-email").val(userMap.get(clicked_id).email);
    $("#edit-role").val(userMap.get(clicked_id).role);
    editId=userMap.get(clicked_id).id;
}

// handling del click and reloading data
function del_click(id){
    delRow(id);
    reloadtable();
}
function delRow(id){
    userMap.delete(id);
    let element=document.getElementById(id);
    let tablebody=document.getElementById('table-body');
    tablebody.removeChild(element);
}

function reloadtable(){
    $("#container").empty();
    loadTable();
    loadData(userMap);
}