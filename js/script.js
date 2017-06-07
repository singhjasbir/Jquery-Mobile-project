var rowid;
//This is the function for the products page..
$(document).on("pageshow", "#products", function(){
	//alert("This is working");
	
	   $.ajax({
		   type: "GET",
           url: "json/products.json",
           dataType: "json",
           success: getData
      });
	  $("ul#list").listview("refresh");
function getData(data){
    for (var i=0; i<10; i++){
	$("#data" + i).html("");
	$("#data" + i).append("<p><b>Product ID:- </b>" + data.product[i].prodId + "</p> ");
	$("#data" + i).append("<p><b>Description:- </b>" + data.product[i].prodDesc + "</p>");
	$("#data" + i).append("<p><b>Cost :- </b>" + data.product[i].prodAmt+ "</p>");
	}
}

});//end of function..

//-----------------------Starting of a new function---------------------//
$(document).on("pageshow", "#customers", function (){
	 $.ajax({
		   type: "GET",
           url: "json/customers.json",
           dataType: "json",
           success: getCust
  });
function getCust(data){
	var start=data.company.customer;
	$("ul#custnames").html("");
	for (var x=0; x < start.length; x++) {
		$("ul#custnames").append(
			"<li li-id='"+x+"' class='ui-btn ui-icon ui-btn-icon-right'>" +
				"<a href='#individual'>" + 
					"<span id='n" + x + "'>" + 
						start[x].compName + 
					"</span>" + 
				"</a></li>");									
	}
	$("#custnames").listview("refresh");	
	
}
});//-- end here -------


$(document).on("click", "#custnames >li", function() { 
	localStorage.setItem("rowid", $(this).closest("li").attr("li-id"));
	 rowid = localStorage.getItem("rowid");
	 //alert("The row id is " +rowid);
});


$(document).on("pagebeforeshow", "#individual", function(){
	
	$.ajax({
    type: "GET", url: "json/customers.json", dataType: "json", 
		success: parseJson
	 });
	 
	 function parseJson(data){
	 rowid = localStorage.getItem("rowid");
	 console.log(rowid);
	 console.log(data);
	 
	 var jas = data.company.customer;
	 $('#cust').html("");
	 $("#cust").append(
		"<br><table class='blue'><tr><th>ID:  </th><td>" + jas[rowid].compId+ "</td></tr>" +	
		                         "<tr><th>Name:  </th><td>" + jas[rowid].compName+ "</td></tr>" +	
								  "<tr><th>Address:  </th><td>" + jas[rowid].compAddr+ "</td></tr>" +
		                         "<tr><th>Location:  </th><td>" + jas[rowid].compContact+ "</td></tr>" +	
								  "<tr><th>Phone Number:  </th><td>" + jas[rowid].compPhone+ "</td></tr>" +	
								   "<tr><th>Email:  </th><td>" + jas[rowid].compEmail+ "</td></tr>" +	
		"</table>");
		
		
	 }
});

$(document).on("pageshow", "#invoices", function (){
	 $.ajax({
		   type: "GET",
           url: "json/invoices.json",
           dataType: "json",
           success: getInv
  });
function getInv(data){
	var start=data.invoice;
	$("ul#inv").html("");
	for (var x=0; x < start.length; x++) {
		$("ul#inv").append(
			"<li li-id='"+x+"' class='ui-btn ui-icon ui-btn-icon-right'>" +
				"<a href='#invinfo'>" + 
					"<span id='n" + x + "'>" + 
						start[x].invNum + 
					"</span>" + 
				"</a></li>");									
	}
	$("#inv").listview("refresh");	
	
}
});//-- end here -------

$(document).on("click", "#inv >li", function() { 
	localStorage.setItem("rowid", $(this).closest("li").attr("li-id"));
	 rowid = localStorage.getItem("rowid");
	 //alert("The row id is " +rowid);
});
$(document).on("pagebeforeshow", "#invinfo", function(){
	
	$.ajax({
    type: "GET", url: "json/invoices.json", dataType: "json", 
		success: parseJson
	 });
	 
	 function parseJson(data){
	 rowid = localStorage.getItem("rowid");
	 
	 var jas = data.invoice;
	 $('#invo').html("");
	 $("#invo").append(
		"<br><table class='blue'><tr><th>ID:  </th><td>" + jas[rowid].invNum+ "</td></tr>" +	
		                         "<tr><th>Date:  </th><td>" + jas[rowid].invDate+ "</td></tr>" +	
								  "<tr><th>Amount:  </th><td>" + jas[rowid].invAmt+ "</td></tr>" +
		                         "<tr><th>Customer ID:  </th><td>" + jas[rowid].compId+ "</td></tr>" +
		"</table>");
		  $('#cool').html("");
		for(var j=0; j< data.invoice[rowid].prod.length; j++){
         			$("#cool").append("<b>Product Id:-</b> " + data.invoice[rowid].prod[j].prodId + "<br>");
					$("#cool").append("<b>Quantity:-</b> " + data.invoice[rowid].prod[j].qty + "<br>");
         		}

		 
	 }
});

$(document).on("pagebeforeshow", "#email", function(){
	
	$.ajax({
    type: "GET", url: "json/customers.json", dataType: "json", 
		success: parse
	 });
	  rowid = localStorage.getItem("rowid");
	  //alert("Row " + rowid);
	  $("#custemail").html("");
	 function parse(data){
		 //console.log(data);
		$("#myEmail").val(data.company.customer[rowid].compEmail);
    $("#mail").click(function (){
	var x = "mailto:" + $('#myEmail').val() + '?subject=' + $('#subject').val() + '&body=' + $('#message').val();
	document.location.href = x;
	$('#demo').HTML = x;
	   });
	 }
});

































