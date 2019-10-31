import * as _ from 'lodash';
import { GitHubApiService } from './GitHubApiService';
import { User } from './user';
import { Repo } from './repo';

console.log("hello index");
console.log(process.argv);

// check whether username is provided run: "npm start michstrand"
if (process.argv.length < 3) {

    console.log('please include github username as argument')

} else {

    let username = process.argv[2];
    console.log('calling REST services on Github');
    let svc = new GitHubApiService();
    // get user details from Github
    svc.getUserInfo(username, (user: User) => {
        
        // get repos details for same user from Github
        svc.getRepos(username, (repos: Repo[]) => {
        
            // sort list of repos af repo.size (asc)
            let sortedRepos = _.sortBy(repos, [(repo: Repo) => repo.size ]);

            // only printout the first repo sorted after size
            let filteredRepos = _.take(sortedRepos, 1);
            user.repos = filteredRepos;
            
            // printout result
            console.log(user);
        });    
    });
}



