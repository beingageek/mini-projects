var itemMembers = {"item": ["Item1", "Item2", "Item3", "Item4"], "disabledItems": []};
if (undefined != localStorage.getItem("itemMembers") || "null" == localStorage.itemMembers) {
    itemMembers = JSON.parse(localStorage.getItem("itemMembers"));
}
$(function() {
    // Disable when items are clicked
    $('#item_listing_div').on("click", "button", function(event){
        var inactiveMember = this.innerHTML;
        $(this).addClass("pure-button-disabled");
        var index = itemMembers.item.findIndex(x => x === inactiveMember);
        itemMembers.item.splice(index, 1);
        itemMembers.disabledItems.splice(itemMembers.disabledItems.length, 1, inactiveMember);
        showMembers();
    });
    // Activate spinner
    $('#spin_now').on("click", function(){
        hideWheel();
        $('#container').show();
        setTimeout(showResult, 1500);
    });
    // Edit items
    $('#edit_items').on("click", function() {
        $('#edit_items').hide();
        $('#edit_items_form').show();
        $('#spin_now').hide();
    });
    // Save items in local storage 
    $('#update_items_list').on("click", function() {
        var userItems = document.getElementById("items_input").value;
        itemMembers.item = userItems.split(",");
        localStorage.setItem("itemMembers", JSON.stringify(itemMembers));
        showMembers();
        $('#edit_items_form').hide();
        $('#spin_now').show();
    })
});
function showMembers() {
    $('#item_listing_div').html("");
    for (mem in itemMembers.item) {
        $('#item_listing_div').append("<button class=\"pure-button\">" + itemMembers.item[mem].trim() + "</button>");
    }
    for (mem in itemMembers.disabledItems) {
        $('#item_listing_div').append("<button class=\"pure-button pure-button-disabled\">" 
        + itemMembers.disabledItems[mem] + "</button>");
    }
}
function hideWheel() {$('#container').hide();$('#result_name').html("");}
function showResult() {hideWheel();$('#result_name').html(getRandomName());}
function getRandomName() {var a = Math.floor(Math.random() * itemMembers.item.length);return itemMembers.item[a];}
