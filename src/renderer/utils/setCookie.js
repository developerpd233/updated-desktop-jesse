const setCookie = (response) => {
    let token = response.headers.authorization.split(' ')[1];
    document.cookie = `token=${token}`
    return
}

module.exports = { setCookie }