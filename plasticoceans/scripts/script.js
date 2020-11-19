/*
    Project Name: Plastic Oceans Calculator
    Program Name: Script.js

    Program Description: The Javascript file that will manipulae
    the swiping quiz and then submit the ajax request to the valid 
    ip address and get the id for the user back.

    With this id, we will get the results which will
    trigger to display the final page. 

    Data Dictionary:

    question - used to hold the current tab





*/

//Global Variables

//The Current Question Tab
var question = 0;
var footprintresults;

//List of Functions
showTab(0);
// Name: showTab
// Purpose: Show the current tab and its related elemeents.
// Parameters:
// n -> Value of the tab to show. 
function showTab(n) {

    // Code to Get Response Information
    // var res = 1;
    // // var c = jQuery.ajax({
    // //     method:"GET",
    // //     url:"http://54.237.123.58:8080/api/v1/resources/response/consumption?response_id="+res,
    // //     contentType:"application/json"});
    // console.log(c);

    // Get the List of Tabs
    var tabs = jQuery(".tab").toArray();

    //  Fade the Current Tab In
    jQuery(tabs[n]).fadeIn(1200);

    // Show the appropriate buttons.
    if (n == 0) {
        jQuery("#prevBtn").css("display", "none");
    } else {
        jQuery("#prevBtn").css("display", "inline");
    }
    if (n == (tabs.length - 1)) {
        jQuery("#nextBtn").hide();
        jQuery("#submit").show()
    }
    else if(n==0){
        jQuery("#nextBtn").hide();
    }
    else {
        jQuery("#nextBtn").show()
        jQuery("#submit").hide()
    }

    // Show What Step We are On
    var steps = jQuery(".step").toArray();
    for (i = 0; i < steps.length; i++) {
        jQuery(steps[i]).removeClass(" active");
    }
    jQuery(steps[n]).addClass("active finish");
}

//switchTab handles switching tabs.
function switchTab(n) {

    // Switch Tab
    var x = document.getElementsByClassName("tab");
    jQuery(x[question]).hide();
    question = question + n;

    // Check if at End of Form
    if (question >= x.length) {
        return false;
    }

    // Display the correct tab:
    showTab(question);
}

// Validate the name and email.
function validateForm(name, email) {
    
    // Get Values
    if (name == null || email == null) {
        return false;
    }

    // Validate Email: Borrowed from: https://www.w3resource.com/javascript/form/email-validation.php
    if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))) {
        return (false)
    }

    return true;
}


//Submit the Document
function submitform() {
    var dropdowns = jQuery("select option:selected").text();
   
    // Everything below was included in the original project.
    // var name = jQuery("#footprintcalculatorname").val();
    // var email = jQuery("#footprintcalculatoremail").val();

    // //Make sure they enter a name and email.
    // if (validateForm(name, email) == false) {
    //     jQuery("#footprintemailnameerror").show();
    //     return false;
    // }

    // // Strip Tags
    // name = name.replace(/(<([^>]+)>)/gi, "");
    // email = email.replace(/(<([^>]+)>)/gi, "");

    dropdowns = dropdowns.split(' ');
    object = {
        plastic_bags: dropdowns[0].replace(/(<([^>]+)>)/gi, ""),
        pet_bottles: dropdowns[1].replace(/(<([^>]+)>)/gi, ""), //Plastic Bottles
        food_wrappers: dropdowns[2].replace(/(<([^>]+)>)/gi, ""),
        plastic_straws: dropdowns[3].replace(/(<([^>]+)>)/gi, ""),
        cotton_swabs: dropdowns[4].replace(/(<([^>]+)>)/gi, ""),
        cleaning_products: dropdowns[5].replace(/(<([^>]+)>)/gi, ""), //Detergent
        shower_bottles: dropdowns[6].replace(/(<([^>]+)>)/gi, ""),
        toothbrushes: dropdowns[7].replace(/(<([^>]+)>)/gi, ""),
        toothpastes: dropdowns[8].replace(/(<([^>]+)>)/gi, ""),
        take_away_boxes: dropdowns[9].replace(/(<([^>]+)>)/gi, ""), //Plastic Box
        take_away_cups: dropdowns[10].replace(/(<([^>]+)>)/gi, ""),
        cutlery: dropdowns[11].replace(/(<([^>]+)>)/gi, ""),
        shirts: dropdowns[12].replace(/(<([^>]+)>)/gi, ""),
        pants: dropdowns[13].replace(/(<([^>]+)>)/gi, ""),
        cig_packs: dropdowns[14].replace(/(<([^>]+)>)/gi, ""),
        e_comm: dropdowns[15].replace(/(<([^>]+)>)/gi, ""),
    };
    object2 = JSON.stringify(object);
    //
    //
    // Send the Information
    // * commented out for demo purposes. 
    //
    // var c = jQuery.ajax({
    //     method:"POST",
    //     url:"http://54.237.123.58:8080/api/v1/resources/responses/response",
    //     data:object2,
    //     contentType:"application/json"});
    
    // c.done(function(res){

    // Retrieve the Results


    //     var result = jQuery.ajax({
    //     method:"GET",
    //     url:"http://54.237.123.58:8080/api/v1/resources/response/consumption?response_id="+res,
    //     contentType:"application/json"});
    //     result.done(function(information){
    //         footprintresults = information;
    //         console.log(footprintresults)
            
    //         //Show the Results
    //         showResults();
    //     })
    // })
    // c.fail(function(){
    //     alert("Error: We are so sorry but we seem to be having issues connecting to our servers. We are sorry for the inconvenience.");
    // })


    // Hand Inputted Values
    footprintresults = {
        bathroom_consumption : "5",
        fashion_consumption : "5",
        kitchen_consumption : "10",
        smoking_consumption : "0",
        takeout_consumption : "30",
        e_comm_consumption : "43",
        total_consumption : "93",
    }
    showResults();

}


// Function that shows the results.
function showResults() {
    // Get the List of Tabs
    jQuery("#calculateFootPrint").hide();
    jQuery("#calculationResultsFootPrint").css("display", "flex");

    // Display the Result Page
    jQuery("#calculateFootPrintMain").removeClass("questions");
    jQuery("#calculateFootPrintMain").addClass("results");

    // Fill in Attributes
    jQuery("span#name").text("Evan")
    jQuery("span#consumptionkg").text(footprintresults.total_consumption)


    // Create Pie Chart
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
}

function drawChart(){
    console.log(footprintresults.total_consumption);
      var data = google.visualization.arrayToDataTable([
        ['Who', 'Amount', {role:'style'}],
        ['You',    parseInt(footprintresults.total_consumption) , 'white'],
        ['North America',      84, 'orange'],
        ['Europe',  31, 'yellow'],
        ['Asia', 64, 'cyan'],
      ]);

      var view = new google.visualization.DataView(data);
      view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);

      var options = {
        title: 'How do you compare to the average person?',
        bars: 'horizontal',
        legend:{
            position:'none',
        textStyle:{color:'white',
        fontName: 'Montserrat',
        fontSize: 15,}},
        vAxis: {
            textStyle: {
              color:'white',
              fontName: 'Montserrat',
            }
          },
        backgroundColor:'#219B21',
        titleTextStyle:{color:'white',
        fontName: 'Montserrat',
        fontSize: 15,},
      };

      var data2 = google.visualization.arrayToDataTable([
        ['Category of Plastics', 'Percentage of Total KG'],
        ['Bathroom',    parseInt(footprintresults.bathroom_consumption)/parseInt(footprintresults.total_consumption)],
        ['Fashion',      parseInt(footprintresults.fashion_consumption)/parseInt(footprintresults.total_consumption)],
        ['Kitchen',  parseInt(footprintresults.kitchen_consumption)/parseInt(footprintresults.total_consumption)],
        ['Smoking', parseInt(footprintresults.smoking_consumption)/parseInt(footprintresults.total_consumption)],
        ['Takeout', parseInt(footprintresults.takeout_consumption)/parseInt(footprintresults.total_consumption)],
        ['E-Commerce', parseInt(footprintresults.e_comm_consumption)/parseInt(footprintresults.total_consumption)],

    ]);

      var view2 = new google.visualization.DataView(data2);

      var options2 = {
        bars: 'horizontal',
        legend:{
            position:'none',
        textStyle:{color:'white',
        fontName: 'Montserrat',
        fontSize: 15,}},
        title:'Where are you using plastic?',
        titleTextStyle:{color:'white',
        fontName: 'Montserrat',
        fontSize: 15,},
        backgroundColor:'#219B21',
        colors:['red', 'yellow', 'orange', 'blue', 'purple','darkblue']
      };

      var chart = new google.visualization.BarChart(document.getElementById('barchart'));
      var piechart = new google.visualization.PieChart(document.getElementById('piechart'));
      chart.draw(view, options);
      piechart.draw(view2,options2);
}