function etchTextFile() {
    fetch('images/etch 압력.txt')
    .then(Response => Response.text())
    .then(data => {
        document.getElementById('output').textContent = data;
    })
    .catch(error => {
        console.error('Error reading the file:', error);
    });
}

function allTextFile() {
    fetch('images/전체주기.txt')
    .then(Response => Response.text())
    .then(data => {
        document.getElementById('output').textContent = data;
    })
    .catch(error => {
        console.error('Error reading the file:', error);
    });
}


const users = ['ps'];

function checkUser() {
    const username = document.getElementById('username').value;

    if (users.includes(username)) {
        window.location.href = "roster.html"; // 유저명 확인 후 리다이렉션할 페이지
    } else {
        alert('올바른 키워드가 아닙니다.');
    }
}