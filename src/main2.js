let books = {};

$(document).ready(() => {
    $('#modal-add-book-ok').on('click', addBookToLibrary);
    let saveBook = localStorage.getItem('library');
    if (saveBook) {
        books = JSON.parse(saveBook);
        console.log('localStorage:');
        console.log(books);
        for (let key in books) {
            drawBook(key);
        }
    }
});

function addBookToLibrary() {
    let formData = $('form').serializeArray();
    console.log(formData);
    let inputArray = {};
    for (key in formData) {
        inputArray[formData[key]['name']] = formData[key]['value'];
    };
    console.log(inputArray);

    let data = $(this).attr('data');
    console.log('===========================' + data);

    if (data == undefined) {
        let vendorCode = Math.round(Math.random() * 100000);
        books[vendorCode] = inputArray;
        drawBook(vendorCode);
        //console.log(books);
    } else {
        books[data] = inputArray;
        drawBook(data);
    }
    $('#modal-add-book').modal('hide');
    console.log(books);
    //localStorage.setItem('library', JSON.stringify(books) );
    saveToLocalStorage(books);
};

function saveToLocalStorage(value) {
    localStorage.setItem('library', JSON.stringify(value) );
}

let drawBook = (vendor) => {
    // найти конкретную книгу внутри масива
    var book = $('.book[data=' + vendor + ']');
    if (book.length == 0){

        let div = document.createElement('div');
        div.className = 'col-lg-3 book';
        div.setAttribute('data', vendor);

        let bookName = document.createElement('h3');
        bookName.className = 'book-title';
        bookName.innerHTML = books[vendor]['book-name'];

        let bookAuthor = document.createElement('p');
        bookAuthor.className = 'book-author';
        bookAuthor.innerHTML = books[vendor]['book-author'];

        let bookYear = document.createElement('p');
        bookYear.className = 'book-year';
        bookYear.innerHTML = books[vendor]['book-year'];
        
        let vendorNumber = document.createElement('p');
        vendorNumber.className = 'book-vendor-number';
        vendorNumber.innerHTML = 'Vendor number: ' + vendor;

        let link = document.createElement('a');
        link.className = 'book-link btn-book-block btn btn-success';
        link.setAttribute('href', books[vendor]['book-link']);
        link.setAttribute('target', '_blank');
        link.innerHTML = 'Download';

        let buttonEdit = document.createElement('button');
        buttonEdit.className = 'edit btn-book-block btn btn-success';
        buttonEdit.innerHTML = 'Edit';
        buttonEdit.setAttribute('data', vendor);
        buttonEdit.onclick = runBtnEdit;

        let buttonDelete = document.createElement('button');
        buttonDelete.className = 'delete btn-book-block btn btn-danger';
        buttonDelete.innerHTML = 'Delete';
        buttonDelete.setAttribute('data', vendor);
        buttonDelete.onclick = deleteBook;
        
        div.appendChild(bookName);
        div.appendChild(bookAuthor);
        div.appendChild(bookYear);
        div.appendChild(vendorNumber);
        div.appendChild(link);
        div.appendChild(buttonEdit);
        div.appendChild(buttonDelete);
        
        $('.book-panel').append(div);
    } else {
        let bookN = book.find('.book-title').eq(0);
        bookN.html( books[vendor]['book-name'] );
        let bookYear = book.find('.book-year').eq(0);
        bookYear.html( books[vendor]['book-year'] );
        let bookAuthor = book.find('.book-author').eq(0);
        bookAuthor.html( books[vendor]['book-author'] );

        $('#modal-add-book-ok').removeAttr('data');
    }
};

// кнопка редактирование свойств книги
function runBtnEdit() {
    let data = $(this).attr('data');
    //console.log(data);
    // show modal windows for edit book
    $('#modal-add-book').modal('show');
    $('form #book-name').val(books[data]['book-name']);
    $('form #book-author').val(books[data]['book-author']);
    $('form #book-year').val(books[data]['book-year']);
    $('form #book-link').val(books[data]['book-link']);
    // add atribute "date" for button "Add book" it's need for modifyi
    $('#modal-add-book-ok').attr('data', data);
};

function deleteBook() {
    $(this).parent('.book').remove();
    let data = $(this).attr('data');
    console.log('delete book:' + data);
    delete books[data];
    console.log(books);
    saveToLocalStorage(books);
};