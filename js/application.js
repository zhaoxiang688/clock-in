window.reactEnv = {
    SERVER_ADDR: 'http://192.111.1.134:31807/eoa-test',

    // 服务器接口相对路径
    KKFileViewURL: 'http://192.111.1.24:8012/onlinePreview?url=',


    ospplatform: 'mobileweb',
    /**
     * 使用移动app的登陆页面
     */
    EnableAppLogin: false,
    /**
     * 使用移动端提供的配置数据
     */
    EnableAppCongfig: false,
    /**
      * 支持离线访问
      */
    MobileAppOfflineSupport: false,
    SYS_ID: 'ESP_OA',
    useEnvCache: "1",
    /**
     * 硬编码审批已办是否加载制单节点单据
     */
    LoadStartTask: false,
    APP_PO: {
        // 可通过配置中心配置， 功能同 window.GWTPO
        International: 'zh',
        Country: 'CN',
        MultiLanguage: 'false', //是否启用多语言，在保存表单时生成不同的json文件
        MenuMultiLanguage: 'false', // 是否启用菜单多语言
        // DBNO: "OSP_DB01",
        // DataBaseName: "OSP_DB01",
    }
};

window.getRootUrl = function () {
    var origin = window.location.origin;
    var pathName = window.location.pathname;
    return origin + '/' + pathName.split('/')[1];
};

window.getLoadingImage = function () {
    var origin = window.location.origin;
    var pathName = window.location.pathname;
    return origin + pathName + '/loading.gif';
};

window.getMobileEoaInfo = function (callback) {
    const userMap = {
        '3646': '田智',
        "6979": '赵翔',
        '3029': '韩维龙',
        '2992': '刘宝甲',
        '3209': '方梦婷',
        '1163': '李素华',
        '1973': '王道文',
        '2229': '李小燕',
        '4213': '邓玫玫'
    }
    const user = JSON.parse(localStorage.getItem('ospm-UserData'));
    const userInfo = {
        Authorization: localStorage.getItem('tokenStr'),
        userId: user.username,
        userName: userMap[user.username]
    }
    localStorage.setItem('eoaUserInfo', JSON.stringify(userInfo));
    if (callback) {
        callback();
    }
}
