"use strict";
const info = $('#info');

const refresh = function(){
      info.html('');
      info.append("<h1>Welcome to <span><i>Chamich</i></span> Calory Calculator! </h1>");
      info.append("<p> If you are concerned abou your health and physical shape and want to keep your diet under control, <span><i>Chamich</i></span> is perfect for you!  </p>");
      info.append("<p><span><i>Chamich</i></span> has lots of funtions, including body mass index calculation, daily calory consumption calculation. It can also compute how much calories you have burnt during the day!</p>");
      info.append('<p>We hope that the app will be helpful for you and that you will enjoy using it .Have fun with <span><i>Chamich</i></span>!')
};
refresh();


const getFood = function() {
     
   $.ajax({
       url      : "/foods",
       type     : 'get',
       dataType : 'json',
       
       success  : function(data) {        
           info.html('');
           info.append('<p><b>Here you can find the list of foods, including their caloric value, and much more!</p></b><p style = "font-size:11px"><i>*The amount of calories, protein, fats and carbohydrates are represented with respect to 100 grams of a certain foodstuff.</p></i>')
           info.append('<table><tr><th>Product</th><th>Protein</th><th>Carbohydrates</th><th>Fats</th><th>Calories</th></tr>');
           data.items.forEach(function(listItem){
           const foo = $('<tr><td>'+listItem.product+'</td><td>'+listItem.prot+'</td><td>'+listItem.carbs+'</td><td>'+listItem.fat+'</td><td>'+listItem.calory+'</td></tr>');         	
           info.append(foo);

         });
        
        
        info.append('</table>')
       },
       
       error    : function(data) {
           alert('Error');
       }
    });
};

const getAct = function() {
       
   $.ajax({
       url      : "/activities",
       type     : 'get',
       dataType : 'json',

       success  : function(data) {        
           info.html(''); 
           info.append('<p><b>Here you can find the list of physical activities, and how many calories you can burn by involving in those activities.</p></b><p style = "font-size:11px"><i>*The amount of calories burnt is represented with respect to 60 hours of a certain activity.</p></i>')
           info.append('<table><tr><th>Activity</th><th>Calories burnt</th></tr>');
           data.items.forEach(function(listItem){
           const act = $('<tr><td>'+listItem.act+'</td><td>'+listItem.calory+'</td></tr>');          	         
           info.append(act);
           	});
        
        
        info.append('</table>')
       },
       
       error    : function(data) {
           alert('Error');
       }
    });
};

const getIndex = function(){
    info.html('');
    info.append('<b><p>Body mass index is a measure of body fat based on height and weight.</p><p> By calculating your BMI, you can find out whether or not the amount of fat in your body is considered normal.</p></b>  ');
    info.append('<div id = "bmicalc">Weight in kilograms: <input type="text" placeholder="Enter weight in kilograms..." id="weight"><br><br>');
    info.append('Height in meters: <input type="text" placeholder="Enter height in meters..." id="height"><br><br>');
    info.append('<button id ="bmi">Compute BMI</button><br></div><br><br>');
    info.append('<div id = "indexresult" class = "bmi"></div>');
    info.append('<div id="category"><p>BMI categories:</p><p>Underweight <= 18.5</p><p>Normal weight = 18.5-24.9</p><p>Overweight = 25-29.9</p><p>Obesity =>30</p></div>')
    

    $('#bmi').on('click', function() {
      $('#indexresult').html('');
      let a = $('#weight').val();
      let b = $('#height').val();

      a = parseFloat(a, 10);
      b = parseFloat(b, 10);

      $('#weight').val('');
      $('#height').val('');
      let c = (a/(b*b));
      c = Math.round(c);
	    $('#indexresult').append('<p id = "result">Your BMI:   '+c+'</p>');
      });

};

const getNorm = function(){
    info.html('');
    info.append('<b><p>Here, you can find out how many calories you should consume daily in order to maintain your weight.</p><p>You can definitely consume more than what is recommended, but in order to maintain your weight you would have to involve in physical activities. </p></b>')
    info.append('<div id = "calcalc"><p> Select gender: <button id ="M">M</button><button id ="F">F</button></p>');
    info.append('<p>Weight in kilograms: <input type="text" placeholder="Enter weight in kilograms..." id="weight"><//p>');
    info.append('<p>Height in meters: <input type="text" placeholder="Enter height in meters..." id="height"></p>');
    info.append('<p>Age in years: <input type="text" placeholder="Enter age in years..." id="age"></p>');
    info.append('<p><button id ="bmr">Compute daily calory intake</button></p></div>');
    info.append('<div id = "bmrdiv"></div>');
    

    $('#bmr').on('click', function() {
      $('#bmrdiv').html('');
      let a = $('#weight').val();
      let b = $('#height').val();
      let c = $('#age').val();

      a = parseFloat(a, 10);
      b = parseFloat(b, 10);
      c = parseFloat(c, 10);

      $('#weight').val('');
      $('#height').val('');
      $('#age').val('');
      let gender = '';
      $('#M').on('click', function() {
         return gender = 'male';      
      }); 
      $('#F').on('click', function() {
         return gender = 'female';      
      }); 
      if (gender = 'male'){
        let d  = (88.36+13.4*a+480*b-5.7*c);
        d = Math.round(d); 
        $('#bmrdiv').append('Your daily calory consumption:   '+d);
      } 
      else {
        let e = (447.6+9.2*a+310*b-4.3*c);
        e = Math.round(e);
        $('#bmrdiv').append('Your daily calory consumption:   '+e);
      };
      
    });

};


const analyzeCons = function(){     

              
           info.html('');
           info.append("<b><p>You can calculate the amount of calories you have consumed during the day.</p><p>Simply enter the amount you have consumed in grams, select the foodstuff consumed and find out the value of your caloric intake.</p></b> ");
           info.append('<table><tr><th>Amount(gr)</th><th>Product</th><th>Protein</th><th>Carbohydrates</th><th>Fats</th><th>Calories</th></tr>');
           info.append('<tr><td><input type="text" placeholder="Enter amount consumed" id="amount"></td><td><input type="text" placeholder="Search product" id="searchbox" onkeyup="drop()""><div id="myDropdown"></div></td><td id="prot"></td><td id="carbs"></td><td id = "fat"></td><td id="cal"></td></tr></table>');
         }    
       
    




const drop = function(){
  document.getElementById("myDropdown").classList.toggle("show");
   let searchtext = $('#searchbox').val();
   $.ajax({
         url      : "/foods",
         type     : 'get',
         dataType : 'json',
         data     : {
                searchtext : searchtext
                        },
        success  : function(data) {  
         $('#myDropdown').html('');   
        data.items.forEach(function(listItem){
                  
       $('#myDropdown').append('<ul><li onclick = consumed('+listItem.calory+','+listItem.prot+','+listItem.carbs+','+listItem.fat+')>'+listItem.product+'</li></ul>');
                });
     
                },
        error    : function(data) {
          alert('Error');
      }
   });
};

const consumed = function(calory, prot, carbs, fat){
  let amount = $('#amount').val();
  amount = parseFloat(amount, 10);
  $('#amount').val('');
  $('#searchbox').val('');
  let a = (prot*amount)/100;
  let b = (carbs*amount)/100;
  let c = (fat*amount)/100;
  let d = (calory*amount)/100;
  a = Math.round(a);
  b = Math.round(b);
  c = Math.round(c);
  d = Math.round(d);
  $('#prot').append(a);
  $('#carbs').append(b);
  $('#fat').append(c);
  $("#cal").append(d);
};


const analyzeBurnt = function(){
            
           info.html('');
           info.append('<p><b>Here, you can easily calculate how many calories you have burn due to a certain physical activity.</p><p>Simply enter the time in minutes that you have spent on a certain activity, then select the type of activity</p><p>and find out how many extra calories you will be able to consume!</p></b>');
           info.append('<table><tr><th>Time(mins)</th><th>Activity</th><th>Calories burnt</th></tr>');
           info.append('<tr><td><input type="text" placeholder="Enter time" id="time"></td><td><input type="text" placeholder="Search activity" id="searchbox" onkeyup="drop2()""><div id="myDropdown2"></div></td><td id="cal"></td></tr></table>');
          
};

const drop2 = function(){
  document.getElementById("myDropdown2").classList.toggle("show");
   let searchtext = $('#searchbox').val();
   $.ajax({
         url      : "/activities",
         type     : 'get',
         dataType : 'json',
         data     : {
                searchtext : searchtext
                        },
        success  : function(data) {   

        $('#myDropdown2').html('');
        data.items.forEach(function(listItem){
                  
       $('#myDropdown2').append('<ul><li onclick = burnt('+listItem.calory+')>'+listItem.act+'</li></ul>');
                });
     
                },
        error    : function(data) {
          alert('Error');
      }
   });
};

const burnt = function(calory){
  let time = $('#time').val();
  time = parseFloat(time, 10);
  $('#time').val('');
  $('#searchbox').val('');
  let a = (calory*time)/60;
  a = Math.round(a);   
  $("#cal").append(a);
};


$('#home').on('click', function() {
	refresh();
}); 
$('#foods').on('click', function() {
	getFood();
});

$('#activities').on('click', function() {
	getAct();
});

$('#index').on('click', function() {
	getIndex();
});

$('#norm').on('click', function() {
  getNorm();
});

$('#consumed').on('click', function() {
  analyzeCons();
});

$('#spent').on('click', function(){
  analyzeBurnt();
});



