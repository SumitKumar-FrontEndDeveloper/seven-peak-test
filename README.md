# Welcome to Peaks project!

Hi! Peaks is a test project. This project has been developed on ReactJS. In simple Peaks is a NEWS application based on web technology  and entirely depends on [Guardian API](https://open-platform.theguardian.com/).

## Installation Requirements
 - [Nodejs](https://nodejs.org/en/)
 - [serve-build](https://www.npmjs.com/package/serve-build/v/0.1.0)

## Local Environment
Clone this Repository to a local folder.  Get your APIKey from [The Guardian](https://open-platform.theguardian.com/access/).
```bash
$ cd <folder name>
$ npm install
```
### For Linux or Mac OS
```bash
$ REACT_APP_NEWSAPIKEY=<APIKey> npm run start
```
### For windows
```bash
($env:REACT_APP_NEWSAPIKEY="<APIKey>") -and (npm run start)
```

## Production Environment
```bash
$ cd <folder name>
$ npm install
```
### For Linux or Mac OS
```bash
$ REACT_APP_NEWSAPIKEY=<APIKey> npm run build
```
### For windows
```bash
($env:REACT_APP_NEWSAPIKEY="<APIKey>") -and (npm run build)
```