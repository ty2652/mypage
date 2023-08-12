function handleClick(event) {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');

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
