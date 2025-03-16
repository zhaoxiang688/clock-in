let defaultUrl = window.reactEnv.SERVER_ADDR;
// 登录
const loginApi = (params) => axios.post(defaultUrl + '/osplogin', params);
const login = async (username, password) => {
    let params = {
        username,
        password
    }
    try {
        let res = await loginApi(Qs.stringify(params));
        if (res.data.code == 200) {
            const data = res.data.data;
            localStorage.setItem('tokenStr', 'Bearer ' + data.token);
            const userMap = {
                '6979': '赵翔'
            }
            let userInfo = {
                UserCaption: userMap[username],
                username: username
            }
            localStorage.setItem('ospm-UserData', JSON.stringify(userInfo));
            document.getElementById('login-result').innerHTML = username + '用户已登录'
            document.getElementById('clock-result').innerHTML = ''
            window.location.reload();
        } else {
            document.getElementById('login-result').innerHTML = '用户未登录'
        }
    } catch (error) {
        console.error('登录失败', error)
    }
}

document.getElementById('login').onclick = function () {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    login(username, password);
}
document.getElementById('clearCache').onclick = function () {
    localStorage.clear();
    document.getElementById('login-result').innerHTML = '用户未登录'
    window.location.reload();
}