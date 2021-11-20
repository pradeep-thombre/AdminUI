

// -------------------------------------click listeners ----------------------------------------


// searching data and reloading data 
$("#searchtext").keyup(function() {
    loadSearchedData($("#searchtext").val());
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
    loadSearchedData($("#searchtext").val());
});

//deleting selected users and reloading data 
$("#delete-select").click( function(){

    for (let user of selectedItem) {
        tempMap.delete(user);
    }
    loadData(tempMap,0);
    selectedItem=[];

});
