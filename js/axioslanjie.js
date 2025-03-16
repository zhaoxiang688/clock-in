axios.interceptors.request.use(
    (config) => {
        // 动态添加 Token
        const token = localStorage.getItem('tokenStr');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // 请求错误处理
        return Promise.reject(error);
    }
);