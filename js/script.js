var siteNameInput = document.getElementById("bookmarkname")
var siteUrlInput = document.getElementById("bookmarkURL")
var bookMarks = [];
var tableContainer = document.getElementById("tBody")


// 3ashan el data matemsehsh fel refresh 
if (localStorage.bookMarks != null) {
    bookMarks = JSON.parse(localStorage.bookMarks);
    displayInputs(bookMarks);
}


// function to add new bookmark

function addBookMark() {

    if (validURL() == true && siteNameInput.value != "") {
        // object creation to take inputs from user 
        var newBookMark = {
            siteName: siteNameInput.value,
            siteUrl: siteUrlInput.value,
        }
        bookMarks.push(newBookMark);
        displayInputs(bookMarks)
        localStorage.setItem('bookMarks', JSON.stringify(bookMarks));
        clearInputs();

    } else {
        // sweetalert-part
        Swal.fire({
            title: "Site Name or Url is not valid, Please follow the rules below :",
            text: ` ${siteNameInput.value == "" ? "Site name must contain at least 3 characters" : ""}
                ${validURL() == false ? "Site URL must be a valid one" : ""}`,

            icon: "error"
        });
    };


}

// ~ function to clear inputs after submit

function clearInputs() {
    siteNameInput.value = ''
    siteUrlInput.value = ''

}

// function to display inputs from the array contain objects
function displayInputs(list) {
    var box = ""
    for (var i = 0; i < list.length; i++) {
        box += `
<tr>
<td>${i + 1}</td>
<td>${list[i].siteName}</td>
<td><a href="${list[i].siteUrl}" class="btn btn-visit" target="_blank"><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
<td><button class="btn  btn-delete" onclick="deleteBookMark(${i})"> <i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
</tr>
        `;
    }
    tableContainer.innerHTML = box
}

// function to delete objects
function deleteBookMark(index) {
    bookMarks.splice(index, 1)
    localStorage.setItem('bookMarks', JSON.stringify(bookMarks));
    displayInputs(bookMarks);


}


// function to validate the site link 

function validURL() {

    var regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    regex.test(siteUrlInput.value);
 console.log(regex.test(siteUrlInput.value));
    return regex.test(siteUrlInput.value);
}