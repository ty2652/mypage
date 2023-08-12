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
    const searchInput = document.querySelector('.searchInput-center');
    const profileDiv = document.querySelector('.profile-div');

    searchInput.classList.add('searchInput-center');
    searchInput.style.display = 'flex';
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
        showAlert('검색 결과가 없습니다.');
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
         const searchInput = document.querySelector('.searchInput-center');
     if (profileDiv.style.display === 'none') {
        document.getElementById('output').textContent = '';
         profileDiv.style.display = 'block';
         searchInput.style.display = 'none';
     } else {
         profileDiv.style.display = 'none';
     }
}

function Checkuser() {
    const id = document.getElementById('username').value;
    fetch(`https://port-0-psdb-ac2nll73fmem.sel3.cloudtype.app/check-user/${id}`)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .then(data => {

        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('refreshToken', data.refreshToken); // 새로운 리프레시 토큰 저장
            redirectToRosterPage();
        } else {
            alert("암호가 틀렸습니다. 저에게 문의해주세요.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function redirectToRosterPage() {
    const token = localStorage.getItem('token');
    if (token) {
        window.location.href = 'https://ltuk.kr/roster.html';
    } else {
        alert('You need a valid token to access this page.');
        window.location.href = 'https://ltuk.kr/index.html';
    }
}

// 5분마다 새로운 토큰 발급
setInterval(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
        fetch('https://port-0-psdb-ac2nll73fmem.sel3.cloudtype.app/refresh-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refreshToken: refreshToken })
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
            }
        })
        .catch(error => {
            console.error('Error refreshing token:', error);
        });
    }
}, 5 * 60 * 1000); // 5분마다 실행 (밀리초 단위)
function logout(){
    localStorage.removeItem('token');
      localStorage.removeItem('refreshToken'); // 리프레시 토큰도 삭제
      alert('Logged out successfully');
 }
