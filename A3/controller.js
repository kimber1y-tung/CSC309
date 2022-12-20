// Add all your JS code here
const username_regex = new RegExp("^[a-zA-Z0-9\_][a-zA-Z0-9\_]*.{5,}");
const pw_regex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*]).{8,}");
const email_regex = new RegExp("^[a-zA-Z0-9]+([\-\+\.\_\'][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([\-\.][a-zA-Z0-9]+)*\.[a-zA-Z0-9]+([\-\.][a-zA-Z0-9]+)*$");
const phone_regex = new RegExp("^[0-9]{3}[\-][0-9]{3}[\-][0-9]{4}$");

var username_val = false;
var pw_val = false;
var email_val = false;
var phone_val = false;

var items_name = [];
var subtotal = 0;
var tax = 0;
var grand_total = 0;

// reference: https://stackoverflow.com/questions/40558819/document-getelementbyid-returns-null-value
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', check);
} else {
    //The DOMContentLoaded is loaded
    check()
}

function check(){

    let username = document.getElementById("username");
    // username.addEventListener("input", check_username);
    username.onkeyup = check_username;

    let pw1 = document.getElementById("password1");
    // pw1.addEventListener("input", check_password);
    pw1.onkeyup = check_password;
    let pw2 = document.getElementById("password2");
    // pw2.addEventListener("input", check_password);
    pw2.onkeyup = check_password;

    let email = document.getElementById("email");
    // email.addEventListener("input", check_email);
    email.onkeyup = check_email;

    let phone = document.getElementById("phone");
    // phone.addEventListener("input", check_phone);
    phone.onkeyup = check_phone;


    document.getElementById("register").addEventListener("click", function(event) {
        // document.write(5 + 6);
        event.preventDefault();
        let username = document.getElementById("username");
        username.onkeyup = check_username;

        if (username_val && pw_val && email_val && phone_val){
            // everything is valid 
            // var xhttp = new XMLHttpRequest();
            // xhttp.onreadystatechange = function() {
            //     if (this.readyState == 4 && this.status == 200) {
            //       document.getElementById("demo").innerHTML = this.responseText;
            //     }
            //   };
            //   xhttp.open("POST", "https://mcsapps.utm.utoronto.ca/csc309s22/a3/register", true);
            //   xhttp.send();
            
            $.ajax({
                url: 'https://mcsapps.utm.utoronto.ca/csc309s22/a3/register',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    username: $('#username').val(),
                    password1: $('#password1').val(),
                    password2: $('#password2').val(),
                    email: $('#email').val(),
                    phone: $('#phone').val(),
                }),
                success: function(xhr){
                    if (xhr.status === 200){
                        alert("User added");
                    }
                },
                error: function(xhr){
                    if (xhr.status === 200){
                        const placeholder = document.querySelector("#notification");
                        placeholder.innerHTML = "User added";
                    }
                    if (xhr.status === 400){
                        const placeholder = document.querySelector("#notification");
                        placeholder.innerHTML = "Unknown error occurred";
                    }
                    if (xhr.status === 409){
                        const placeholder = document.querySelector("#notification");
                        placeholder.innerHTML = "Username has already been taken";
                    }
                }
            })
        }            

        else {
            // something is wrong
            if (!username_val){
                const placeholder = document.querySelector("#username_notification");
                placeholder.innerHTML = "Username is invalid";
                username.style.backgroundColor = 'red';
                // username.style.borderColor = 'red';
            }

            if (!pw_val){
                let pw1_value = document.getElementById("password1").value;
                let pw2_value = document.getElementById("password2").value;
                const placeholder1 = document.querySelector("#password1_notification");
                const placeholder2 = document.querySelector("#password2_notification");

                if (pw1_value !== pw2_value){
                    placeholder2.innerHTML = "Passwords don't match";
                    pw2.style.backgroundColor = 'red';
                    // pw2.style.borderColor = 'red';

                } else {
                    placeholder1.innerHTML = "Password is invalid";
                    pw1.style.backgroundColor = 'red';
                    // pw1.style.borderColor = 'red';
                }
                
                // if pw2 is blank
                if (!pw2_value){
                    pw2.style.backgroundColor = 'red';
                    // pw2.style.borderColor = 'red';

                }
            }

            if (!email_val){
                const placeholder = document.querySelector("#email_notification");
                placeholder.innerHTML = "Email is invalid";
                email.style.backgroundColor = 'red';
                // email.style.borderColor = 'red';
            }

            if (!phone_val){
                const placeholder = document.querySelector("#phone_notification");
                placeholder.innerHTML = "Phone is invalid";
                phone.style.backgroundColor = 'red';
                // phone.style.borderColor = 'red';
            }

            const placeholder = document.querySelector("#notification");
            placeholder.innerHTML = "At least one field is invalid. Please correct it before proceeding"
        }
    })

    document.getElementById("add_update_item").addEventListener("click", function(event) {
        // document.write("123123");
        event.preventDefault();
        let nname = document.getElementById("name").value;
        nname = nname.replace(/ /g,"_");
        let nprice = document.getElementById("price").value;
        let nquantity = document.getElementById("quantity").value;
        
        // check if name already exists, update
        if (items_name.includes(nname)){
            var table = document.getElementById("cart-items")
            old_price = table.rows[items_name.indexOf(nname)+1].cells[1].innerHTML
            old_quantity = table.rows[items_name.indexOf(nname)+1].cells[2].innerHTML
            old_total = table.rows[items_name.indexOf(nname)+1].cells[3].innerHTML
            table.rows[items_name.indexOf(nname)+1].cells[0].innerHTML = nname;
            table.rows[items_name.indexOf(nname)+1].cells[1].innerHTML = nprice;
            table.rows[items_name.indexOf(nname)+1].cells[2].innerHTML = nquantity;
            table.rows[items_name.indexOf(nname)+1].cells[3].innerHTML = nprice * nquantity;
            subtotal = subtotal - old_price * old_quantity + nprice * nquantity;
            tax = subtotal * 0.13;
            grand_total = subtotal + tax;
            document.getElementById("subtotal").innerHTML = Math.round(subtotal * 100) / 100
            document.getElementById("taxes").innerHTML = Math.round(tax * 100) / 100
            document.getElementById("grand_total").innerHTML = Math.round(grand_total * 100) / 100
        }
        
        else{


            // $("#cart-items").append("<tr>" + 
            // "<td>" + nname + "</td>" +
            // "<td>" + nprice + "</td>" +
            // "<td>" + nquantity + "</td>" + 
            // "<td>" + nprice * nquantity + "</td>" + 
            // // "<td>" + document.querySelector('button') + "</td>" + 
            // // "<td>" + minus_button + "</td>" + 
            // "</tr>");
            var table = document.getElementById("cart-items")
            let row = table.insertRow();
            row.id = nname;
            let c1 = row.insertCell();
            c1.innerHTML = nname;
            let c2 = row.insertCell();
            c2.innerHTML = nprice;
            let c3 = row.insertCell();
            c3.innerHTML = nquantity;
            let c4 = row.insertCell();
            c4.innerHTML = nprice * nquantity

            // add item
            items_name.push(nname);
            subtotal = subtotal + nprice * nquantity;
            tax = subtotal * 0.13;
            grand_total = subtotal + tax;
            document.getElementById("subtotal").innerHTML = (Math.round(subtotal * 100) / 100).toFixed(2)
            document.getElementById("taxes").innerHTML = (Math.round(tax * 100) / 100).toFixed(2)
            document.getElementById("grand_total").innerHTML = (Math.round(grand_total * 100) / 100).toFixed(2)


            let minus_button = document.createElement("button");
            minus_button.setAttribute("class", "decrease");
            minus_button.innerHTML = "-";
            let c5 = row.insertCell();
            c5.append(minus_button);
            minus_button.addEventListener ("click", function() {
                // document.write("this is " + nquantity + "end")
                if (parseInt(nquantity) - 1 >= 0){
                    nquantity = parseInt(nquantity) - 1;
                    c3.innerHTML = nquantity;
                    c4.innerHTML = nprice * nquantity
                    subtotal = parseInt(subtotal) - parseInt(nprice);
                    tax = subtotal * 0.13;
                    grand_total = subtotal + tax;
                    document.getElementById("subtotal").innerHTML = (Math.round(subtotal * 100) / 100).toFixed(2)
                    document.getElementById("taxes").innerHTML = (Math.round(tax * 100) / 100).toFixed(2)
                    document.getElementById("grand_total").innerHTML = (Math.round(grand_total * 100) / 100).toFixed(2)
                }
              });
        
            let add_button = document.createElement("button");
            add_button.setAttribute("class", "increase");
            add_button.innerHTML = "+";
            let c6 = row.insertCell();
            c6.append(add_button);
            add_button.addEventListener ("click", function() {
                nquantity = parseInt(nquantity) + 1;
                c3.innerHTML = nquantity;
                c4.innerHTML = nprice * nquantity
                subtotal = parseInt(subtotal) + parseInt(nprice);
                tax = subtotal * 0.13;
                grand_total = subtotal + tax;
                document.getElementById("subtotal").innerHTML = (Math.round(subtotal * 100) / 100).toFixed(2)
                document.getElementById("taxes").innerHTML = (Math.round(tax * 100) / 100).toFixed(2)
                document.getElementById("grand_total").innerHTML = (Math.round(grand_total * 100) / 100).toFixed(2)

              });

            let delete_button = document.createElement("button");
            delete_button.setAttribute("class", "delete");
            delete_button.innerHTML = "delete";
            let c7 = row.insertCell();
            c7.append(delete_button);
            delete_button.addEventListener ("click", function() {
                let index = items_name.indexOf(nname);
                old_total = table.rows[items_name.indexOf(nname)+1].cells[3].innerHTML
                subtotal = parseInt(subtotal) - parseInt(old_total);
                tax = subtotal * 0.13;
                grand_total = subtotal + tax;
                document.getElementById("subtotal").innerHTML = (Math.round(subtotal * 100) / 100).toFixed(2)
                document.getElementById("taxes").innerHTML = (Math.round(tax * 100) / 100).toFixed(2)
                document.getElementById("grand_total").innerHTML = (Math.round(grand_total * 100) / 100).toFixed(2)
                table.deleteRow(index + 1)
                items_name.splice(index, 1);
              });
            

        }

    })
    
}


function check_username(){
    let username = document.getElementById("username").value;
    const placeholder = document.querySelector("#username_notification");

    if (username.length >= 6 && username_regex.test(username)){
        placeholder.innerHTML = "";
        username_val = true;
    }
    // else if (!username_regex.test(username)) {
    //     placeholder.innerHTML = "Username chachetrs is invalid";
    // }
    else {
        placeholder.innerHTML = "Username is invalid";
        username_val = false;
    }
}

function check_password(){
    let pw1 = document.getElementById("password1").value;
    let pw2 = document.getElementById("password2").value;
    const placeholder1 = document.querySelector("#password1_notification");
    const placeholder2 = document.querySelector("#password2_notification");

    if (pw1.length >= 8 && pw_regex.test(pw1)){
        placeholder1.innerHTML = ""
        pw_val = true;
    }
    else{
        placeholder1.innerHTML = "Password is invalid"
        pw_val = false;
    }

    if (pw1 !== pw2){
        placeholder2.innerHTML = "Passwords don't match"
        pw_val = false;
    }
    else{
        placeholder2.innerHTML = ""
        pw_val = true;
    }
}

function check_email(){
    let email = document.getElementById("email").value;
    const placeholder = document.querySelector("#email_notification");

    if (email_regex.test(email)){
        placeholder.innerHTML = ""
        email_val = true;
    }
    else{
        placeholder.innerHTML = "Email is invalid"
        email_val = false;
    }
}

function check_phone(){
    let phone = document.getElementById("phone").value;
    const placeholder = document.querySelector("#phone_notification");

    // if (phone_regex.test(phone)){
    //     placeholder.innerHTML = "regeex good"
    // }
    // else{
    //     placeholder.innerHTML = "len no good"
    // }
    if (phone.length === 12 && phone_regex.test(phone)){
        placeholder.innerHTML = ""
        phone_val = true;
    }
    else{
        placeholder.innerHTML = "Phone is invalid"
        phone_val = false;
    }
}




