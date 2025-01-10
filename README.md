# Fun Weather Dashboard

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Description

This weather dashboard application will show the weather forecast for a city when a user inputs the name of that city. This could be helpful for someone who is planning a trip to a new city, for example. This assignment is part of the Module 9 Challenge for the Rutgers University Coding Bootcamp. The purpose of this project is to design the back end of an application, connect the back end and front end, test the application using Insomnia, and deploy the application to Render. This project incorporates external APIs, modularization, HTTP request methods, Express, Vite, async/await methods, and middleware. Through this project, I learned more about how to use APIs to retrieve data, like weather information. I also improved my ability to modularize my code in order to make it more digestible and easier to troubleshoot.

## Table of Contents (Optional)

- [Link to Application](#link-to-application)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Questions](#questions)

## Link to Application

link goes here

## Installation

The application can be used in the web browser and can be accessed through this link:

To install the application on your local device for testing, editing, or viewing, perform the following steps:

1. In the terminal, navigate to where you would like the repo to be stored on your device.

2. Using the HTTPS or SSH key found in the GitHub repo, clone the repo to your device using the following:

    ```sh
    git clone <filepath>
    ```

3. Switch into the fun-weather-dashboard directory. 

    ```sh
    cd fun-weather-dashboard
    ```

4. In the command line, install dependencies using the following:

    ```sh
    npm i
    ```

## Usage

The application can be used in the web browser and can be accessed through this link:

To start the server in the terminal for testing or other purposes, perform the following steps:

1. After the installation steps have been completed, build the program. Be sure that you are in the fun-weather-dashboard directory.

    ```sh
    npm run build
    ```

2. Start the server:

    ```sh
    npm run start
    ```

3. You should see that the server is running on port 3001. You can now test the HTTP requests using Insomnia or any other application designed to test APIs.

4. For example, in Insomnia, create a new GET request using the plus sign, and insert this link at the top: (http://localhost:3001). Hit 'Send'. This will process the application and allow you to interact with it.

## Credits

Starter code was sourced from Rutgers University Coding Bootcamp section RUT-VIRT-FSF-PT-10-2024-U-LOLC-MWTH > Assignments > Module 9 Challenge > starter code (https://bootcampspot.instructure.com/courses/6369/assignments/90397?module_item_id=1341108). The starter code includes all folders and files except for the searchHistory.json and README.md files and the 'assets' folder. No changes or contributions were made to the 'client' folder, except for an addition to the .gitignore file. I made contributions to files in the 'server' folder, including weatherRoutes.ts, htmlRoutes.ts, historyService.ts, weatherService.ts, and server.ts. Additionally, I used GitHub Copilot and ChatGPT for assistance with troubleshooting, particularly in the weatherService.ts file.

GitHub: amelia1105 (https://github.com/amelia1105)

## License

MIT License

Copyright (c) 2024 Amelia Bellanger

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Questions

For any questions about this project, please contact me by email: aebellanger@yahoo.com