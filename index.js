// start by creating data so we don't have to type it in each time
let movieArray = [];

// define a constructor to create movie objects
let MovieObject = function (pTitle, pYear, pGenre, pMan, pWoman, pURL) {
    
    this.Title = pTitle;
    this.Year = pYear;
   // this.ID = movieArray.length + 1;
    this.ID = Math.random().toString(16).slice(5) 
    //this.ID = Math.floor((Math.random() * 100) + 1);// tiny chance could get duplicates!
    this.Genre = pGenre;  // action  comedy  drama  horrow scifi  musical  western
    this.Man = pMan;
    this.Woman = pWoman;
    this.URL = pURL;
}

/*
movieArray.push(new MovieObject("Moonstruck", 1981, "Drama", "Nicholas Cage", "Cher", "https://www.youtube.com/watch?v=M01_2CKL6PU"));
movieArray.push(new MovieObject("Wild At Heart", 1982, "Drama", "Nicholas Cage", "Laura VanDern", "https://www.youtube.com/watch?v=7uRJartX79Q"));
movieArray.push(new MovieObject("Raising Arizona", 1983, "Comedy", "Nicholas Cage", "Holly Hunter", "https://www.youtube.com/watch?v=NoXJKArYi1g"));
movieArray.push(new MovieObject("USS Indianapolis: Men of Courage", 2016, "Drama", "Nicholas Cage", "Emily Tennant", "https://youtu.be/ZDPE-NronKk")); */

movieArray.push(new MovieObject("Khant Nyunt", 24, "Computer Science", "Bachelor's Degree", "2025", "https://www.linkedin.com/in/khant-nyunt-940aba206/"));
movieArray.push(new MovieObject("Justin", 21, "Computer Science", "Associate Degree", "2027", "https://www.linkedin.com/in/khant-nyunt-940aba206/"));
movieArray.push(new MovieObject("Sarah", 21, "Computer Science", "Certificate", "2024", "https://www.linkedin.com/in/khant-nyunt-940aba206/"));
movieArray.push(new MovieObject("John", 20, "Computer Science", "Bachelor's Degree", "2023", "https://www.linkedin.com/in/khant-nyunt-940aba206/"));




let selectedGenre = "not selected";

document.addEventListener("DOMContentLoaded", function () {

    createList();

// add button events ************************************************************************
    
    document.getElementById("buttonAdd").addEventListener("click", function () {
        movieArray.push(new MovieObject(document.getElementById("title").value, 
        document.getElementById("year").value,
        selectedGenre,
        document.getElementById("man").value,
        document.getElementById("woman").value,
        movieArray.length,  // set ID
        document.getElementById("URL").value));
        document.location.href = "index.html#ListAll";
        // also add the URL value
    });
    
    document.getElementById("buttonClear").addEventListener("click", function () {
        document.getElementById("title").value = "";
        document.getElementById("year").value = "";
        document.getElementById("man").value = "";
        document.getElementById("woman").value = "";
        document.getElementById("URL").value = "";
    });

    $(document).bind("change", "#select-genre", function (event, ui) {
        selectedGenre = $('#select-genre').val();
    });


    document.getElementById("buttonSortTitle").addEventListener("click", function () {
        movieArray.sort(dynamicSort("Title"));
        createList();
        document.location.href = "index.html#ListAll";
    });

    document.getElementById("buttonSortGenre").addEventListener("click", function () {
        movieArray.sort(dynamicSort("Genre"));
        createList();
        document.location.href = "index.html#ListAll";
    });

    // button on details page to view the youtube video
    document.getElementById("trailer").addEventListener("click", function () {
        window.open(document.getElementById("oneURL").innerHTML);
    });
// end of add button events ************************************************************************

  
  
// page before show code
$(document).on("pagebeforeshow", "#details", function (event) {
    let localID = localStorage.getItem('parm');
    
    console.log('localID:', localID);
    
    // next step to avoid bug in jQuery Mobile, force the movie array to be current
    movieArray = JSON.parse(localStorage.getItem('movieArray')); 
    let pointer = GetArrayPointer(localID);
    
    console.log('pointer:', pointer);
    
    document.getElementById("oneTitle").innerHTML = "The Student Name: " + movieArray[pointer].Title;
    document.getElementById("oneYear").innerHTML = "The Student Age: " + movieArray[pointer].Year;
    document.getElementById("oneGenre").innerHTML = "Major is " + movieArray[pointer].Genre;
    document.getElementById("oneWoman").innerHTML = "Education Level: " + movieArray[pointer].Woman;
    document.getElementById("oneMan").innerHTML = "Expected Graduation Year: " + movieArray[pointer].Man;
    document.getElementById("oneURL").innerHTML = movieArray[pointer].URL;
  });
// end of page before show code *************************************************************************

});  
// end of wait until document has loaded event  *************************************************************************

function createList() {
    // clear prior data
   let myUL =document.getElementById("MovieListul");
   myUL.innerHTML = "";
   

    movieArray.forEach(function (oneMovie) {   // use handy array forEach method
        var myLi = document.createElement('li');
        // adding a class name to each one as a way of creating a collection
        myLi.classList.add('oneMovie'); 
        // use the html5 "data-parm" to encode the ID of this particular data object
        // that we are building an li from
        myLi.setAttribute("data-parm", oneMovie.ID);
        myLi.innerHTML = " Student ID: "+ oneMovie.ID + ":     "+"  "+ oneMovie.Title + "    : enrolled in        " +"   "+ oneMovie.Genre + "    "+"    Programs ";
        myUL.appendChild(myLi);
    });
   

    // now we have the HTML done to display out list, 
    // next we make them active buttons
    // set up an event for each new li item, 
    var liList = document.getElementsByClassName("oneMovie");
    let newMoviewArray = Array.from(liList);
    newMoviewArray.forEach(function (element) {
        element.addEventListener('click', function () {
        // get that data-parm we added for THIS particular li as we loop thru them
        var parm = this.getAttribute("data-parm");  // passing in the record.Id
        // get our hidden <p> and save THIS ID value in the localStorage "dictionairy"
        localStorage.setItem('parm', parm);
       
       
       
        // but also, to get around a "bug" in jQuery Mobile, take a snapshot of the
        // current movie array and save it to localStorage as well.
        let stringMovieArray = JSON.stringify(movieArray); // convert array to "string"
        localStorage.setItem('movieArray', stringMovieArray);
        
        
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
function GetArrayPointer(localID) {
    for (let i = 0; i < movieArray.length; i++) {
        if (localID === movieArray[i].ID) {
            return i;
        }
    }
}
