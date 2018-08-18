import {
    login,
    logout,
    getInfo
} from "@/api/login";
import {
    getToken,
    setToken,
    removeToken
} from "@/utils/auth";

const user = {
    state: {
        token: getToken(),
        username: "",
        avatar: "",
        roles: ""
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_NAME: (state, username) => {
            state.username = username;
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        }
    },

    actions: {
        // 登录
        Login({
            commit
        }, userInfo) {
            const _username = userInfo.username.trim();
            return new Promise((resolve, reject) => {
                login(_username, userInfo.password)
                    .then(response => {
                        const data = response.data;
                        console.log(data.token)
                        setToken(data.token); //设置cookie
                        commit("SET_TOKEN", data.token);
                        resolve();
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },

        // 获取用户信息
        GetInfo({
            commit,
            state
        }) {
            return new Promise((resolve, reject) => {
                getInfo(state.token)
                    .then(response => {
                        const data = response.data;
                        //判断用户权限为是否为admin
                        if (data.roles == 'admin') {
                            commit("SET_ROLES", data.roles);
                        } else {
                            reject("getInfo: no permission !");
                        }
                        commit("SET_NAME", data.username);
                        // commit("SET_AVATAR", data.avatar);
                        resolve(response);
                    })
                    .catch(error => {                        
                        reject(error);
                    });
            });
        },

        // 登出
        LogOut({
            commit,
            state
        }) {
            return new Promise((resolve, reject) => {
                logout(state.token)
                    .then(() => {
                        commit("SET_TOKEN", "");
                        commit("SET_ROLES", []);
                        removeToken();
                        resolve();
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },

        // 前端 登出
        FedLogOut({
            commit
        }) {
            return new Promise(resolve => {
                commit("SET_TOKEN", "");
                removeToken();
                resolve();
            });
        }
    }
};

export default user;
