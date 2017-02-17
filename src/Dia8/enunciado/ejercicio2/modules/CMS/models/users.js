let user = null;

function getCurrentUser() {
    return user
}

function login (newUser) {
    user = newUser;
}

function logout () {
    user = null;
}

export default {
    getCurrentUser,
    login,
    logout
}