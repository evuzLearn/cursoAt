const url = 'http://localhost:3030';

const Problem = Backbone.Model.extend({

})

const Problems = Backbone.Collection.extend({
    url: url + '/problems',
    model: Problem
})

let problems;

function getProblems() {
    let deferred = $.Deferred();

    if (problems) {
        deferred.resolve(problems);
    } else {
        let tempProblems = new Problems();
        tempProblems.fetch()
            .then(() => {
                problems = tempProblems;
                deferred.resolve(problems);
            })
            .fail((err) => {
                deferred.reject(err);
            })
    }

    return deferred.promise()
}

function saveProblem (problem) {
    return problem.save();
}

export default {
    getProblems,
    saveProblem
}