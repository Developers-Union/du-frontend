function Clicked(n) {
    var arr = [
        $('#mmln-blogs'),
        $('#mmln-projects'),
        $('#mmln-teams'),
        $('#mmln-data')
    ];
    for (var i = 0; i < arr.length; i++) {
        if (i == n) {
            arr[i].classList.add('active');
        } else {
            arr[i].classList.remove('active');
        }
    }
}

function editProfile() {
    window.location.href = window.location.href + '/../editprofile.html'
}