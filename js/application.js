window.reactEnv = {
    SERVER_ADDR: 'https://eoa.pansofthk.com:7177/eoa',

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
    }
};
