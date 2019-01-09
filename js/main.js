document.getElementById('myForm').addEventListener('submit', saveBookmark);

//Save bookmark
function saveBookmark(e) {
    //Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!siteName || !siteUrl) {
        alert('Please fill in form');
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }
    /*
        //Local Storage Test
        localStorage.setItem('test', 'Hello World');
        console.log(localStorage.getItem('test'));
        localStorage.removeItem('test');
        console.log(localStorage.getItem('test'));
        */

    //test if bookmarks is null
    if (localStorage.getItem('bookmarks') === null) {
        //init array
        var bookmarks = [];
        bookmarks.push(bookmark);
        //set to Local Storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        //fetch bookmarks from local storage

        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //Add bookmark to array
        bookmarks.push(bookmark);
        //Reset back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    }

    //re-fetch bookmarks
    fetchBookmarks();

    //Prevent Form from submitting
    e.preventDefault();
}

//Delete Bookmark
function deleteBookmark(url) {
    //Get bookmarks from local storage

    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Loop through bookmarks
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            //remove from array
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //re-fetch bookmarks
    fetchBookmarks();
}

//Fetch Bookmarks
function fetchBookmarks() {
    //get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //Get output id

    var bookmarksResults = document.getElementById('bookmarksResults');

    //Output

    bookmarksResults.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">' +
            '<h3>' + name +
            '<a class= "btn btn-default" target="_blank" href= "' + url + '">Visit</a>' +
            '<a onclick="deleteBookmark(\'' + url + '\')"class= "btn btn-danger" href= "#">Delete</a>' +
            '</h3>' +
            '</div>';
    }
}