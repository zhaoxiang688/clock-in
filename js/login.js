let defaultUrl = window.reactEnv.SERVER_ADDR;
let env = 'test';
// 切换账号
document.getElementById('toggle-user').onclick = function(){
    let value = document.getElementById('username').value;
    if(value == '3646'){
        document.getElementById('username').value = '6979';
        document.getElementById('password').value = 'Zhaoxiaolong!23';
    }else{
        document.getElementById('username').value = '3646';
        document.getElementById('password').value = '123456';
    }
}
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
                '3646': '田智',
                '6979': '赵翔'
            }
            let userInfo = {
                UserCaption: userMap[username],
                username: username
            }
            localStorage.setItem('ospm-UserData', JSON.stringify(userInfo));
            document.getElementById('login-result').innerHTML = '用户已登录'
            window.location.reload();
        }else{
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