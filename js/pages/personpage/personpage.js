function follow() {
    const e = $('#button-follow')
    if (e.classList.contains('button-followed')) {
        e.classList.add('button-unfollowed')
        e.classList.remove('button-followed')
        e.innerText = 'unfollow'
    } else {
        e.classList.add('button-followed')
        e.classList.remove('button-unfollowed')
        e.innerText = 'follow'
    }
}
