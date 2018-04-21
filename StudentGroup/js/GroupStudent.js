// Constructor function for creating Student object
function Student(_firstname, _lastname, _age, _email){
    // private properties
    var firstname = _firstname;
    var lastname = _lastname;
    var age = _age;
    var email = _email;
    var scores = [];

    //public methods
    this.AddScore = function(_score){
        if(typeof _score == "number" && _score >= 0 && _score <= 100){
            scores.push(_score);
            return true;
        }
        return false;
    }
    this.GetEmail = function(){
        return email;
    }
    this.GetFirstname = function(){
        return firstname;
    }
    this.GetLastname = function(){
        return lastname;
    }
    this.GetAge = function(){
        return age;
    }   
    this.getFullName = function(){
        return this.GetFirstname() + " " + this.GetLastname();
    }
    this.ShowScore = function(){
        return scores;
    }
}


// Constructor function for creating Group object
function Group(_groupName)
{
    //private properties
    var groupName = _groupName;
    var students = [];

    //public methods

    // Public method for adding new Student
    this.AddStudent = function(_student)
    {
        if(typeof _student == "object")
        {
            for(var i=0; i<students.length; i++){
                if(students[i].GetEmail() == _student.GetEmail())
                {
                    return false;
                }
            }
            students.push(_student);
            return true;
        }
        return false;
    }
    this.DeleteStudent = function(_email){
        var selectedStu = this.FindStudent(_email);

        if(selectedStu){
            var index = students.indexOf(selectedStu);
            students.splice(index, 1);

            return true;
        }
            
        return false;
    }

    // Public method for showing all Students
    this.showStudentArray = function(){
        return students;
    }

    //Public method for finding Student by Email
    this.FindStudent = function(_email){
        for(var i=0; i < students.length; i++){
            if(students[i].GetEmail() == _email)
            {
                return students[i];
            }
        }
        return null;
    }
}