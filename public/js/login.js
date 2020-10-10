// document.querySelector('#loginForm').addEventListener('submit', function(e) {
//     e.preventDefault();
//     console.log(this);
//     let formData = new FormData(this);
//     console.log(formData);
// })
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

$(() => {
    const querry = getUrlVars();
    if (querry.message) {

        const message = decodeURI(querry.message)
        console.log(message)
        const md = $('#messageDiv');
        md.show();
        md.text(message);
    }

})