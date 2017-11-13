/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 *
 * Xiaoling Zheng
 * Nov.12.2017
 */


$( function() {
    $( "#tabs" ).tabs();
} );
            
            
/*function called by reset button; reset all the fields in form*/
function reset_func() {
    document.getElementById("car_form").reset();
    var e1 = document.getElementById("dynamic");
    e1.style.display = 'none';
}
/*function called by reset button; reset all the fields in form*/
        
/*function calculate table*/
function show() {
    var car_prices_ = car_prices();
    var mpgs_ = mpgs();
    var inputs = get_inputs();

    var mncn = new Array(5);
    for (var i = 0; i < 5; i++) {
        mncn[i] = new Array(5);
    }
    
    for (var i = 0; i < 5; i ++){
        for (var j = 0; j < 5; j ++) {
            mncn[i][j] = calculate_results(Number(inputs[0]), Number(inputs[1]), Number(inputs[2]), Number(inputs[3]), Number(inputs[4]), Number(inputs[5]), Number(mpgs_[i]),Number(car_prices_[j]));
        }
    }
                
    var validation = true;
    var temp1, temp2;
                
    for (var i = 1; i < 6; i ++ ) {
        for (var j = 1 ; j < 6; j ++){
                        
        temp1 = mncn[i-1][j-1][0];
        temp2 = mncn[i-1][j-1][1];
        if(isNaN(temp1) | isNaN(temp2)){
            validation = false;
        }
            document.getElementById("m"+i+"c"+j).innerHTML = mncn[i-1][j-1][0] + ", "+ mncn[i-1][j-1][1];
        }
    }

    if (validation === true){
        var e2 = document.getElementById("dynamic");
        e2.style.display = 'block'; 
    } else {
    }
}
/*function calculate table*/
        
/*function get all car prices from input, return as an array*/
function car_prices() {
    var car_p1 = document.getElementById("car_1").value;
    var car_p2 = document.getElementById("car_2").value;
    var car_p3 = document.getElementById("car_3").value;
    var car_p4 = document.getElementById("car_4").value;
    var car_p5 = document.getElementById("car_5").value;

    var c1 = document.getElementById("car_p1").innerHTML = car_p1;
    var c2 = document.getElementById("car_p2").innerHTML = car_p2;
    var c3 = document.getElementById("car_p3").innerHTML = car_p3;
    var c4 = document.getElementById("car_p4").innerHTML = car_p4;
    var c5 = document.getElementById("car_p5").innerHTML = car_p5;
    
    return [c1, c2, c3, c4, c5];
}
/*function get all car prices from input, return as an array*/

/*function get all mpgs from input, return as an array*/
function mpgs() {
    var mpg_1 = document.getElementById("mpg_1").value;
    var mpg_2 = document.getElementById("mpg_2").value;
    var mpg_3 = document.getElementById("mpg_3").value;
    var mpg_4 = document.getElementById("mpg_4").value;
    var mpg_5 = document.getElementById("mpg_5").value;
            
    var m1 = document.getElementById("mpg1").innerHTML = mpg_1;
    var m2 = document.getElementById("mpg2").innerHTML = mpg_2;
    var m3 = document.getElementById("mpg3").innerHTML = mpg_3;
    var m4 = document.getElementById("mpg4").innerHTML = mpg_4;
    var m5 = document.getElementById("mpg5").innerHTML = mpg_5;
    
    return [m1, m2, m3, m4, m5];
}
/*function get all mpgs from input, return as an array*/
        
/*function get all other elements from input, return as an array*/
function get_inputs(){
    var discount = document.getElementById("discount").value;
    var rebate = document.getElementById("rebate").value;
    var number_months = document.getElementById("number_months").value;
    var downpayment = document.getElementById("downpayment").value;
    var interest = document.getElementById("interest").value;
    var mile_per_year = document.getElementById("mile_per_year").value;
    
    return [discount, rebate, downpayment, interest, number_months, mile_per_year];
}
/*function get all other elements from input, return as an aray*/
        
/*function calculate cost per mile and cost per month, return as pair*/
function calculate_results(discount, rebate, downpayment, interest, number_months, mile_per_year, mpg, msrp) {

    var gas_price = document.getElementById("price_per_gallon").value;     
    var down_payment = (msrp - discount - rebate)*(downpayment*0.01);
    var cost_after_down_payment = (msrp - discount - rebate) - down_payment;
    var cost_per_month_after_down_payment = ((interest*0.01/12)*cost_after_down_payment)/(1 - Math.pow((1 + interest*0.01/12),(-number_months)));
    
    cost_per_month = cost_per_month_after_down_payment + down_payment/Number(number_months) + mile_per_year/12/mpg*gas_price;
    
    var total_cost = cost_per_month_after_down_payment*Number(number_months) + down_payment;
        
    cost_per_mile = Number(total_cost)/Number(mile_per_year) + gas_price/Number(mpg);
    cost_per_month = Number(cost_per_month).toFixed(2);
    cost_per_mile = Number(cost_per_mile).toFixed(2); 
            
    return [cost_per_mile, cost_per_month];
}
/*function calculate cost per mile and cost per month, return as pair*/

