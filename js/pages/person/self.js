function clicked(n) {
    var arr = [
        $('#mmln-blogs'),
        $('#mmln-projects'),
        $('#mmln-teams'),
        $('#mmln-data')
    ];
    var contents = [
        $('#blogs-root'),
        $('#content-projects'),
        $('#content-teams'),
        $('#content-data')
    ]
    for (var i = 0; i < arr.length; i++) {
        if (i == n) {
            arr[i].classList.add('active');
            contents[i].style.display = 'block';
        } else {
            arr[i].classList.remove('active');
            contents[i].style.display = 'none';
        }
    }
}

function editProfile() {
    window.location.href = window.location.href + '/../editprofile.html'
}