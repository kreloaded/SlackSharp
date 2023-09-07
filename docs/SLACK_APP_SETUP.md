## Slack app setup
First things first, setup a slack app as mentioned in [this guide](https://api.slack.com/authentication/basics). Following are the major steps involved:

- Create a slack app. Visit https://api.slack.com/apps.
- Configure request URL for interactive components. Click [here](https://api.slack.com/interactivity/handling) for details.
- Configure slash commands. For more details [click here](https://api.slack.com/interactivity/slash-commands).
- Enable event subscriptions. For more details [click here](https://api.slack.com/events-api).
- Add scopes [chat:write](https://api.slack.com/scopes/chat:write), [chat:write:public](https://api.slack.com/scopes/chat:write.public), [commands](https://api.slack.com/scopes/commands) and [files:read](https://api.slack.com/scopes/files:read) to the bot token scopes. Know more about [Slack Scopes](https://api.slack.com/scopes).
- Then [install](https://api.slack.com/authentication/basics#installing) the app to your workspace.

Keep a note of your App ID and Signing Secret from the "Basic Information" section of your app. Also note the Bot User OAuth Token from the "OAuth & Permissions" section of your app. These details will be required to setup the environment variables.