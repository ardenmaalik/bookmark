document.getElementById('myForm').addEventListener('submit', saveBookmark);

//Save bookmark
function saveBookmark(e) {
    //Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    
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
    //Prevent Form from submitting
    e.preventDefault();
}