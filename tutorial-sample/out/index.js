"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = __importStar(require("lodash"));
var GitHubApiService_1 = require("./GitHubApiService");
console.log("hello index");
console.log(process.argv);
if (process.argv.length < 3) {
    console.log('please input username as argument');
}
else {
    var username_1 = process.argv[2];
    console.log('calling REST services on Github');
    var svc_1 = new GitHubApiService_1.GitHubApiService();
    // get user details from Github
    svc_1.getUserInfo(username_1, function (user) {
        // get repos details for same user from Github
        svc_1.getRepos(username_1, function (repos) {
            // sort list of repos af repo.size (asc)
            var sortedRepos = _.sortBy(repos, [function (repo) { return repo.size; }]);
            // only printout the first repo sorted after size
            var filteredRepos = _.take(sortedRepos, 1);
            user.repos = filteredRepos;
            // printout result
            console.log(user);
        });
    });
}
