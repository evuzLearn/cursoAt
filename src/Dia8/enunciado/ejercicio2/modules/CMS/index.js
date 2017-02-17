import Problems from './models/problems';
import Comments from './models/comments';
import Users from './models/users';

function getProblems () {
    return Problems.getProblems();
}

function getComments (problemId) {
    return Comments.getComments(problemId);
}

function saveProblem (problem) {
    return Problems.saveProblem(problem);
}

function getCurrentUser () {
    return Users.getCurrentUser();
}

function logout () {
    Users.logout();
    Broker.channel('login').request('show');
}

function login (user) {
    Users.login(user);
}

function newComment (comment) {
    return Comments.newComment(comment);
}

function deleteComment (comment) {
    return Comments.deleteComment(comment);
}

//
// API
//

const API = {
    getProblems,
    getComments,
    saveProblem,
    getCurrentUser,
    newComment,
    deleteComment,
    login,
    logout
};

Broker.channel('CMS').reply(API);
export default API;