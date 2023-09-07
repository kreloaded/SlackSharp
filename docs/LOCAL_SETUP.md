# Local Setup

## Prerequisites and System Requirements

- [Node.js](https://nodejs.org/en/) 18.0.0 or higher
- [NPM](https://www.npmjs.com/package/npm) 7.0.0 or higher

## Getting Started

### Clone the Project

```sh
$ git clone git@github.com:kreloaded/SlackSharp.git

$ cd SlackSharp
```
### Install Dependencies

```sh
$ npm install
```

### Setup Environment Variables

- Create a `.env` file in the root directory of the project.
- Copy the contents of `.env.example` file to `.env` file.
- Replace the values of the environment variables with your own values.

### Start the Server

```sh
$ npm start
```

## Ngrok Setup

### Install ngrok npm package globally
```sh
$ npm install -g ngrok
```

### Run ngrok
```sh
$ ngrok http 3000
```

- Copy the https forwarding url from the terminal and paste it in the Request URL field of the slack app configuration page.


