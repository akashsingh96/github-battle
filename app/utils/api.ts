import { IRepoList } from "../component/popular";
import { IProfileList } from "../component/results";

const id = "YOUR_CLIENT_ID";
const sec = "YOUR_SECRET_ID";
const params = `?client_id=${id}&client_secret=${sec}`;

function getErrorMessage(message: string, username: string) {
  if (message === "Not Found") {
    return `${username} doesn't exist`;
  }

  return message;
}

function getProfile(username: string) {
  return fetch(`https://api.github.com/users/${username}${params}`)
    .then(res => res.json())
    .then(profile => {
      if (profile.message)
        throw new Error(getErrorMessage(profile.message, username));
      return profile;
    });
}

function getRepos(username: string) {
  return fetch(
    `https://api.github.com/users/${username}/repos${params}&per_page=100`
  )
    .then(res => res.json())
    .then(repos => {
      if (repos.message)
        throw new Error(getErrorMessage(repos.message, username));
      return repos;
    });
}

function getStarCount(repos: IRepoList[]) {
  return repos.reduce(
    (total, { stargazers_count }) => total + stargazers_count,
    0
  );
}
function calculate(followers: number, repos: IRepoList[]) {
  return followers * 3 + getStarCount(repos);
}

function getUserData(player: string) {
  return Promise.all([getProfile(player), getRepos(player)]).then(
    ([profile, repos]) => ({
      profile,
      score: calculate(profile.followers, repos)
    })
  );
}

function sortPlayers(players: { score: number; profile: IProfileList }[]) {
  return players.sort((a, b) => b.score - a.score);
}

export function battle(players: string[]) {
  return Promise.all([getUserData(players[0]), getUserData(players[1])]).then(
    results => sortPlayers(results)
  );
}

export function fetchRepos(languages: string) {
  const url = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${languages}&sort=stars&order=desc&type=Repositories`
  );
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      if (!data.items) {
        throw new Error(data.message);
      }
      return data.items;
    });
}
