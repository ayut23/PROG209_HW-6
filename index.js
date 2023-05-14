// start by creating data so we don't have to type it in each time
let studentArray = [];

// define a constructor to create student objects
let StudentObject = function (pID, pStudentName, pAge, pMajor, pEducation, pGraduation, pURL) {
    this.ID = pID;
    this.StudentName = pStudentName;
    this.Age = pAge;
    this.ID = studentArray.length + 1;
    //this.ID = Math.random().toString(16).slice(5);
    //this.ID = Math.floor((Math.random() * 100) + 1);// tiny chance could get duplicates!
    this.Major = pMajor;  // computer science, nursing, etc.
    this.Education = pEducation;
    this.Graduation = pGraduation;
    this.URL = pURL;
}


studentArray.push(new StudentObject(1, "Khant Nyunt", 24, "Computer Science", "Bachelor's Degree", "2025", "https://www.linkedin.com/in/khant-nyunt-940aba206/"));
studentArray.push(new StudentObject(2, "Justin", 21, "Digital Marketing", "Associate Degree", "2027", "https://www.linkedin.com/in/khant-nyunt-940aba206/"));
studentArray.push(new StudentObject(3, "Sarah", 21, "Business Management", "Certificate", "2024", "https://www.linkedin.com/in/khant-nyunt-940aba206/"));
studentArray.push(new StudentObject(4, "John", 20, "Accounting", "Bachelor's Degree", "2023", "https://www.linkedin.com/in/khant-nyunt-940aba206/"));




let selectedMajor = "not selected";

document.addEventListener("DOMContentLoaded", function () {

    createList();

// add button events ************************************************************************
    
    document.getElementById("buttonAdd").addEventListener("click", function () {
        studentArray.push(new StudentObject(studentArray.ID,
        document.getElementById("name").value,
        document.getElementById("age").value,
        selectedMajor,
        document.getElementById("education").value,
        document.getElementById("graduation").value,
        studentArray.length,  // set ID
        document.getElementById("URL").value));
        document.location.href = "index.html#ListAll";
        // also add the URL value
    });

    // $(document).ready(() => {
    //     $("#photo").change(function () {
    //         const file = this.files[0];
    //         if (file) {
    //             let reader = new FileReader();
    //             reader.onload = function (event) {
    //                 $("#imgPreview")
    //                   .attr("src", event.target.result);
    //             };
    //             reader.readAsDataURL(file);
    //         }
    //     });
    // });

    console.log(studentArray);
    document.getElementById("buttonClear").addEventListener("click", function () {
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("man").value = "";
        document.getElementById("woman").value = "";
        document.getElementById("URL").value = "";
    });

    $(document).bind("change", "#select-major", function (event, ui) {
        selectedMajor = $('#select-major').val();
    });


    document.getElementById("buttonSortName").addEventListener("click", function () {
        studentArray.sort(dynamicSort("StudentName"));
        createList();
        document.location.href = "index.html#ListAll";
    });

    document.getElementById("buttonSortMajor").addEventListener("click", function () {
        studentArray.sort(dynamicSort("Major"));
        createList();
        document.location.href = "index.html#ListAll";
    });

    // button on details page to view the CTC account
    document.getElementById("CTClink").addEventListener("click", function () {
        window.open(document.getElementById("oneURL").innerHTML);
    });
// end of add button events ************************************************************************

  
  
// page before show code

    $(document).on("pagebeforeshow", "#ListAll", function (event) {   // have to use jQuery 
        createList();
    });


    $(document).on("pagebeforeshow", "#details", function (event) {
    let localID = localStorage.getItem('parm');
    
    // next step to avoid bug in jQuery Mobile, force the student array to be current
    studentArray = JSON.parse(localStorage.getItem('studentArray'));
    //let pointer = GetArrayPointer(localID);

    
    //document.getElementById("oneStudentID").innerHTML = "Student ID: " + studentArray[localID - 1].ID;
    document.getElementById("oneName").innerHTML = "The Student Name: " + studentArray[localID - 1].StudentName;
    document.getElementById("oneAge").innerHTML = "The Student Age: " + studentArray[localID - 1].Age;
    document.getElementById("oneMajor").innerHTML = "Major is " + studentArray[localID - 1].Major;
    document.getElementById("oneEducation").innerHTML = "Education Level: " + studentArray[localID - 1].Education;
    document.getElementById("oneGraduation").innerHTML = "Expected Graduation Year: " + studentArray[localID - 1].Graduation;
    document.getElementById("oneURL").innerHTML = studentArray[localID - 1].URL;
    });
// end of page before show code *************************************************************************

});  
// end of wait until document has loaded event  *************************************************************************

function createList() {
    // clear prior data
   let myUL =document.getElementById("StudentListul");
   myUL.innerHTML = "";
   

   studentArray.forEach(function (oneStudent) {   // use handy array forEach method
        var myLi = document.createElement('li');
        // adding a class name to each one as a way of creating a collection
        myLi.classList.add('oneStudent'); 
        // use the html5 "data-parm" to encode the ID of this particular data object
        // that we are building an li from
        myLi.setAttribute("data-parm", oneStudent.ID);
        myLi.innerHTML = oneStudent.ID + ". " + oneStudent.StudentName + ", enrolled in" + "   "+ oneStudent.Major;
        myUL.appendChild(myLi);
    });
   

    // now we have the HTML done to display out list, 
    // next we make them active buttons
    // set up an event for each new li item, 
    var liList = document.getElementsByClassName("oneStudent");
    let newStudentArray = Array.from(liList);
    newStudentArray.forEach(function (element) {
        element.addEventListener('click', function () {
        // get that data-parm we added for THIS particular li as we loop thru them
        var parm = this.getAttribute("data-parm");  // passing in the record.Id
        // get our hidden <p> and save THIS ID value in the localStorage "dictionairy"
        localStorage.setItem('parm', parm);
       
       
       
        // but also, to get around a "bug" in jQuery Mobile, take a snapshot of the
        // current student array and save it to localStorage as well.
        let stringSudentArray = JSON.stringify(studentArray); // convert array to "string"
        localStorage.setItem('studentArray', stringSudentArray);
        
        
        // now jump to our page that will use that one item
        document.location.href = "index.html#details";
        });
    });

};
  

/**
 *  https://ourcodeworld.com/articles/read/764/how-to-sort-alphabetically-an-array-of-objects-by-key-in-javascript
* Function to sort alphabetically an array of objects by some specific key.
* 
* @param {String} property Key of the object to sort.
*/
function dynamicSort(property) {
    var sortOrder = 1;

    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a, b) {
        if (sortOrder == -1) {
            return b[property].localeCompare(a[property]);
        } else {
            return a[property].localeCompare(b[property]);
        }
    }
}

// cycles thru the array to find the array element with a matching ID
// function GetArrayPointer(localID) {
//     for (let i = 0; i < studentArray.length; i++) {
//         if (localID === studentArray[i].ID) {
//             return i;
//         }
//     }
// }
