//在浏览器缓存用户信息
export const setUsername = (username) => {
    window.localStorage.setItem("lotusUserNameMobile", username)
};
export const getUsername = () => {
    return window.localStorage.getItem("lotusUserNameMobile")
};
export const removeUsername = () => {
    return window.localStorage.removeItem("lotusUserNameMobile")
}; 