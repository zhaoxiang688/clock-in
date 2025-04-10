new VConsole();
let userId = '';
// 初始化页面
const initPage = () => {
    document.getElementById('request-url').innerHTML = defaultUrl;
    let userObj = localStorage.getItem('ospm-UserData');
    if (userObj) {
        userObj = JSON.parse(userObj);
        userId = userObj.username;
    }
    if (userId) {
        document.getElementById('login-result').innerHTML = userObj.username + '用户已登录'
        document.getElementById('clearCache').style.display = 'block';
        document.getElementById('login').style.display = 'none';
    } else {
        document.getElementById('clearCache').style.display = 'none';
        document.getElementById('login').style.display = 'block';
        document.getElementById('login-result').innerHTML = '用户未登录'
    }
}
// 初始化页面
initPage();

// 考勤打卡相关接口
// 判断是否需要打卡
const getIsNeedClock = (userId) => axios.post(defaultUrl + '/attendance/get/needClock', Qs.stringify({ userId }), {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
});

// 获取打卡基础数据
const getClockInformation = (userId) => axios.post(defaultUrl + '/attendance/get/information', Qs.stringify({ userId }), {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
});

// 判断打卡位置是否符合要求
// 传参 userId userLat：纬度 userLng：经度
const checkClock = (params) => axios.post(defaultUrl + '/attendance/checkClock', Qs.stringify(params), {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
});

// 打卡接口
// 传参 userId userLat：纬度 userLng：经度
const punchTheClock = (params) => axios.post(defaultUrl + '/attendance/clock', Qs.stringify(params), {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
});
const locationArr = [
    {
        userLat: 36.665417,
        userLng: 117.137557
    },
    {
        userLat: 36.665415,
        userLng: 117.137361
    },
    {
        userLat: 36.665421,
        userLng: 117.137363
    },
    {
        userLat: 36.665402,
        userLng: 117.137419
    },
    {
        userLat: 36.665391,
        userLng: 117.137749
    },
    {
        userLat: 36.665143,
        userLng: 117.137015
    },
    {
        userLat: 36.664847,
        userLng: 117.136827
    },
    {
        userLat: 36.664994,
        userLng: 117.136461
    },
    {
        userLat: 36.664993,
        userLng: 117.136411
    },
    {
        userLat: 36.664991,
        userLng: 117.136423
    },
    {
        userLat: 36.665067,
        userLng: 117.136558
    },
    {
        userLat: 36.665304,
        userLng: 117.136674
    },
    {
        userLat: 36.665325,
        userLng: 117.136674
    },
    {
        userLat: 36.665226,
        userLng: 117.136995
    },
    {
        userLat: 36.665344,
        userLng: 117.136594
    },
    {
        userLat: 36.665341,
        userLng: 117.136581
    },
    {
        userLat: 36.665181,
        userLng: 117.137059
    },
    {
        userLat: 36.665282,
        userLng: 117.137237
    }
]

function getRandomIntExclusive(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// 无需判断下需不需要打卡
const clockIn = async () => {
    // 生成随机整数
    const num = getRandomIntExclusive(0, locationArr.length);
    if (locationArr[num]) {
        document.getElementById('jingweidu-result').innerHTML = `经度：${locationArr[num].userLng} 纬度：${locationArr[num].userLat}`
        try {
            // 判断是否在打卡范围
            let rangeParams = {
                userId,
                ...locationArr[num]
            }
            let isRange = await checkClock(rangeParams);
            // 在考勤范围内
            if (isRange.data.data) {
                // 开始打卡
                let clock = await punchTheClock(rangeParams);
                if (clock.data.data) {
                    document.getElementById('clock-result').innerHTML = '打卡成功 ！！'
                } else {
                    document.getElementById('clock-result').innerHTML = '打卡失败 ！！'
                }
            } else {
                document.getElementById('clock-result').innerHTML = '未在考勤范围内'
            }
        } catch (error) {
            console.error('失败', error)
        }
    } else {
        document.getElementById('jingweidu-result').innerHTML = ''
    }

}
// 先判断下需不需要打卡
const judgeClockIn = async () => {
    try {
        let need = await getIsNeedClock(userId);
        if (need.data.data) {
            const num = getRandomIntExclusive(0, locationArr.length);
            if (locationArr[num]) {
                document.getElementById('jingweidu-result').innerHTML = `经度：${locationArr[num].userLng} 纬度：${locationArr[num].userLat}`
                // 判断是否在打卡范围
                let rangeParams = {
                    userId,
                    ...locationArr[num]
                }
                let isRange = await checkClock(rangeParams);
                // 在考勤范围内
                if (isRange.data.data) {
                    // 开始打卡
                    let clock = await punchTheClock(rangeParams);
                    if (clock.data.data) {
                        document.getElementById('clock-result').innerHTML = '打卡成功 ！！'
                    } else {
                        document.getElementById('clock-result').innerHTML = '打卡失败 ！！'
                    }
                } else {
                    document.getElementById('clock-result').innerHTML = '未在考勤范围内'
                }
            } else {
                document.getElementById('jingweidu-result').innerHTML = ''
            }
        } else {
            document.getElementById('jingweidu-result').innerHTML = '已打卡，无需打卡 ！！'
            document.getElementById('clock-result').innerHTML = '已打卡，无需打卡 ！！'
        }
    } catch (error) {
        console.error('失败', error)
    }
}
// 获取定位信息
const getGpsInfo = (callback) => {
    ospmJsApi.device.webGPS().then((value) => {
        if (callback) {
            let lat = value.data.lat;
            let lng = value.data.lng;
            callback({
                userLat: lat,
                userLng: lng
            });
        }
    }).catch((reason) => {
        console.error('获取定位信息失败', reason);
    })
}
// 查找可用经纬度
const findLocation = () => {
    getGpsInfo(async (obj) => {
        // 判断是否在打卡范围
        let rangeParams = {
            userId,
            ...obj
        }
        let isRange = await checkClock(rangeParams);
        // 在考勤范围内
        if (isRange.data.data) {
            document.getElementById('jingweidu-result').innerHTML = `经度：${obj.userLng} 纬度：${obj.userLat}`
            console.log(`经度userLng：${obj.userLng} 纬度userLat：${obj.userLat}，在考勤范围内！！`)
        } else {
            document.getElementById('clock-result').innerHTML = '未在考勤范围内'
            console.log(`经度userLng：${obj.userLng} 纬度userLat：${obj.userLat}，不在考勤范围内！！`)
        }
    })

}
// 点击打卡按钮（无需判断是否打过卡）
document.getElementById('clockIn').onclick = function () {
    if (userId) {
        clockIn();
    } else {
        document.getElementById('clock-result').innerHTML = '请先登录!!!!'
    }
}
// 点击打卡按钮(判断是否打过卡)
document.getElementById('clockIn-judge').onclick = function () {
    if (userId) {
        judgeClockIn();
    } else {
        document.getElementById('clock-result').innerHTML = '请先登录!!!!'
    }
}
// 点击查找可用经纬度
document.getElementById('find-location').onclick = function () {
    if (userId) {
        findLocation();
    } else {
        document.getElementById('clock-result').innerHTML = '请先登录!!!!'
    }
}
