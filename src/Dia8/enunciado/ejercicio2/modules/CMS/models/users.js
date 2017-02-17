let user = null;

// users = {
//     Manuel: 'user',
//     Arturo: 'user',
//     Silvia: 'user',
//     Francisco: 'user',
//     Marta: 'user',
//     Mariano: 'user',
//     Sonia: 'user',
//     Jose: 'expert'
// }

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