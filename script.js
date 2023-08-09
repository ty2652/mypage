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
function handleClick(event) {
    event.preventDefault();
         const profileDiv = document.querySelector('.profile-div');
     if (profileDiv.style.display === 'none') {
         profileDiv.style.display = 'block';
     } else {
         profileDiv.style.display = 'none';
     }
}
// document.querySelector('.toggle-btn').addEventListener('click',function(event) {
//     event.preventDefault();
//     const profileDiv = document.querySelector('.profile-div');
//     if (profileDiv.style.display === 'none') {
//         profileDiv.style.display = 'block';
//     } else {
//         profileDiv.style.display = 'none';
//     }
// });



function checkUser() {
    const usernameInput = document.getElementById('username');
    const validUsername = "ps"; // 원하는 유효한 사용자 이름으로 변경하세요.

    if (usernameInput.value === validUsername) {
        goToNextPage(); // 이 함수에서 토큰이 생성되고 다음 페이지로 리다이렉트됩니다.
    } else {
        alert('잘못된 사용자 이름입니다.');
    }
}

function generateToken() {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0].toString(36);
}

function goToNextPage() {
    const token = generateToken();
    localStorage.setItem('validUserToken', token);

    // Redirect to nextpage.html with the token as a parameter
    window.location.href = "roster.html?token=" + token;
}

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [,""])[1].replace(/\+/g, '%20')) || null;
}

function checkAccess() {
    const tokenFromLocalStorage = localStorage.getItem('validUserToken');
    
    if (!tokenFromLocalStorage || tokenFromLocalStorage !== validToken) {
        alert('!접근 불가!'); // 메시지 박스 띄우기
        window.location.href = 'index.html'; // 사용자를 index.html로 리다이렉트
    }
}

if (window.location.pathname.endsWith('roster.html')) {
    checkAccess();
}

