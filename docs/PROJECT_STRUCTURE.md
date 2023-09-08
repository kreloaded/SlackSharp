# Project Directory Structure - SlackSharp

This file provides an overview of the directory structure of the project. It explains the purpose of key folders and files and provides a general guideline for organizing your project files.

## Project Root Directory:

```
/SlackSharp
|-- index.js
|-- config/
|-- docs/
|-- lib/
```

### index.js

This file is the entry point of the project. It contains the code for starting the slack bot.

### config/

This folder contains the configuration files for the project. It contains coreConstants which have constants for environment variables used in the project.

### docs/

This folder contains the documentation for the project. It contains the following files:

- [CODE_OF_CONDUCT.md](./docs/CODE_OF_CONDUCT.md): This file contains the code of conduct for the project.
- [CONTRIBUTING.md](./docs/CONTRIBUTING.md): This file contains the guidelines for contributing to the project.
- [ENVIRONMENT_VARS.md](./docs/ENVIRONMENT_VARS.md): This file contains the description of the environment variables used in the project.
- [LOCAL_SETUP.md](./docs/LOCAL_SETUP.md): This file contains the instructions for setting up the project locally.
- [PROJECT_STRUCTURE.md](./docs/PROJECT_STRUCTURE.md): This file contains the description of the project directory structure.
- [SLACK_APP_SETUP.md](./docs/SLACK_APP_SETUP.md): This file contains the instructions for setting up the Slack App.

### lib/

This folder contains the library files for the project which contains common functionalities like openai library, slack methods, constants, etc.
