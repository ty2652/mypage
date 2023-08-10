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
    const profileDiv = document.querySelector('.profile-div');
    profileDiv.style.display = 'none'
    fetch('images/전체주기.txt')
    .then(Response => Response.text())
    .then(data => {
        document.getElementById('output').textContent = data;
    })
    .catch(error => {
        console.error('Error reading the file:', error);
    });
}


function searchText() {
    let searchTerm = document.getElementById('searchInput').value;
    let output = document.getElementById('output');

    // 검색어가 없는 경우
    if (!searchTerm) {
        output.innerHTML = output.textContent;  // 하이라이트 제거
        return;
    }

    let regex = new RegExp(searchTerm, 'gi');
    let matches = output.textContent.match(regex);

    // 검색어가 텍스트에 없는 경우
    if (!matches || matches.length === 0) {
        output.innerHTML = output.textContent;  // 하이라이트 제거
        alert('검색 결과가 없습니다.');
        return;
    }

    // 검색 결과를 노란색으로 강조합니다.
    let highlightedText = output.textContent.replace(regex, match => `<span class="highlight">${match}</span>`);
    output.innerHTML = highlightedText;

    // 모바일 환경에서 첫 번째 검색 결과 위치로 스크롤 이동
    if (window.innerWidth <= 768) {  // 화면 너비가 768px 이하인 경우를 모바일로 간주
        let firstHighlight = document.querySelector('.highlight');
        if (firstHighlight) {
            firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}
function forceUppercaseEnglish(e) {
    let input = e.target;
    // 영어 알파벳, 숫자 및 특수문자만 허용하고, 알파벳은 대문자로 변환합니다.
    input.value = input.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/g, '').toUpperCase();
}

function allowEnglishNumbersAndSpecialCharacters(e) {
    let charCode = (typeof e.which === "number") ? e.which : e.keyCode;
    
    // 영어 알파벳, 숫자, 및 일부 특수문자 범위를 체크합니다.
    if ((charCode >= 65 && charCode <= 90) || // A-Z
        (charCode >= 97 && charCode <= 122) || // a-z
        (charCode >= 48 && charCode <= 57) || // 0-9
        (charCode >= 33 && charCode <= 47) || // 특수문자
        (charCode >= 58 && charCode <= 64) || // 특수문자
        (charCode >= 91 && charCode <= 96) || // 특수문자
        (charCode >= 123 && charCode <= 126) || // 특수문자
        charCode === 8) { // Backspace
        return true;
    }
    return false; // 허용하지 않는 문자 입력 차단
}




function handleClick(event) {
    event.preventDefault();
         const profileDiv = document.querySelector('.profile-div');
     if (profileDiv.style.display === 'none') {
        document.getElementById('output').textContent = '';
         profileDiv.style.display = 'block';
     } else {
         profileDiv.style.display = 'none';
     }
}





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

function addUser() {
    const username = document.getElementById('username').value;

    fetch('/add-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username }),
    })
    .then(response => response.json())
    .then(data => {
        // Assuming the server returns a JSON with a 'message' field
        document.getElementById('result').textContent = data.message;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function checkUserOnServer(username) {
    // 요청 주소는 공인 IP와 연결된 서버의 주소로 변경해야 합니다.
    const serverEndpoint = "ts2652.iptime.org:3000/check-user";

    fetch(serverEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username })  // 예를 들어 username 데이터를 서버에 보냅니다.
    })
    .then(response => response.json())
    .then(data => {
        if(data.valid) {
            console.log("Valid username");
        } else {
            console.log("Invalid username");
        }
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
}
document.getElementById('checkUserButton').addEventListener('click', async () => {
    const username = document.getElementById('usernameInput').value;
    if (!username) {
        alert('Please enter a username.');
        return;
    }

    const serverEndpoint = 'ts2652.iptime.org:3000/check-user'; // Replace with your server's endpoint

    try {
        const response = await fetch(serverEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username })
        });

        const data = await response.json();
        if (data.valid) {
            alert('User is valid.');
        } else {
            alert('User is not valid.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while checking the user.');
    }
});