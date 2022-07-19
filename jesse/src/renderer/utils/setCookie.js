const setCookie = (response) => {
    let token = response.headers.authorization.split(' ')[1];
    console.log(token , 'token');
    document.cookie = `token=${token}`
    return
}

module.exports = { setCookie }