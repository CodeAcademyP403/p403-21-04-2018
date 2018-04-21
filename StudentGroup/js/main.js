var addButton = document.querySelector('.inputDiv button');
var fnameInput = document.querySelector('#fname');
var lnameInput = document.querySelector('#lname');
var ageInput = document.querySelector('#age');
var emailInput = document.querySelector('#email');
var stuTableBody = document.querySelector('#userTable tbody');
// for Modal
var scoreModal = document.querySelector('#scoreModal');
var closeModalBtn = scoreModal.querySelector('#closeModalBtn');
var closeModalIcon = scoreModal.querySelector(".close");
var saveModalBtn = scoreModal.querySelector("#saveModal");

//save selectedStudent
var selectedStudent;

var group = new Group("P403");

closeModalBtn.addEventListener("click", function(){
    closeModal();
})
closeModalIcon.addEventListener("click", function(){
    closeModal();
})

addButton.addEventListener("click", function(){
    var fname = fnameInput.value;   
    var lname = lnameInput.value;   
    var age = parseInt(ageInput.value);   
    var email = emailInput.value;   

    if(checkControls(fname, lname, age, email)){
        // all values are valid
        var st = new Student(fname, lname, age, email);
        var added = group.AddStudent(st);

        if(added){
            UpdateStudentsTable();
        }else{
            showError("Email is duplicate.");
        }
    }
    else{
        showError("Some values are not valid.");
    }
})

function checkControls(_fname, _lname, _age, _email){
    if(_fname != "" && _lname != "" && !isNaN(_age) && _email != "" && _email.indexOf("@") != -1){
        return true;
    }
    return false;
}

function showError(response){
    //some values are not valid, so add alert div
    var div = document.createElement('div');
    div.className = "form-row alert alert-danger mt-3";
    div.innerText = response;

    document.querySelector(".inputDiv").appendChild(div);

    setTimeout(function(){
        div.remove();
    }, 2000)
}

function UpdateStudentsTable(){
    stuTableBody.innerHTML = "";

    var students = group.showStudentArray();

    //loop for students and create table row for each
    for(var stu of students)
    {
        var tr = document.createElement('tr');

        //fill table row

        //firstname td
        var fnameData = document.createElement('td');
        fnameData.innerText = stu.GetFirstname();
        tr.appendChild(fnameData);

        //lastname td
        var lnameData = document.createElement('td');
        lnameData.innerText = stu.GetLastname();
        tr.appendChild(lnameData);

        //age td
        var ageData = document.createElement('td');
        ageData.innerText = stu.GetAge();
        tr.appendChild(ageData);
        
        //email td
        var emailData = document.createElement('td');
        emailData.innerText = stu.GetEmail();
        tr.appendChild(emailData);

        //delete td
        var deleteData = document.createElement('td');
        deleteData.innerHTML = "<i class='fas fa-trash'></i>";
        tr.appendChild(deleteData);

        //remove row when clicked delete td
        deleteData.addEventListener("click", function(){
            var email = this.previousElementSibling.innerText;
            group.DeleteStudent(email);
            UpdateStudentsTable();
        })

        //addScore td
        var scoreData = document.createElement('td');
        scoreData.innerHTML = "<i class='fas fa-plus'></i>"
        tr.appendChild(scoreData);

        //add score to student when clicked plus td
        scoreData.addEventListener("click", function(){
            var email = this.previousElementSibling.previousElementSibling.innerText;
            selectedStudent = group.FindStudent(email);

            if(selectedStudent){

                var modalTitle = scoreModal.querySelector(".modal-title");
                modalTitle.innerText = selectedStudent.getFullName();

                openModal();
            }
            
        })

        //append tr to tbody
        stuTableBody.appendChild(tr);
    }
}

saveModalBtn.addEventListener("click", function(){
    var input = scoreModal.querySelector("#score");
    var score = parseInt(input.value);

    var addedScore = selectedStudent.AddScore(score);
    if(addedScore){
        closeModal();
    }
    else{
        alert("Reqem deyil")
    }
})

function closeModal(){
    scoreModal.style.display = "none";
    scoreModal.classList.remove("show");
    scoreModal.classList.add("fade");
}

function openModal(){
    scoreModal.style.display = "block";
    scoreModal.classList.remove("fade");
    scoreModal.classList.add("show");
}