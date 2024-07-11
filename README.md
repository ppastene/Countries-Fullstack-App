# Countries Fullstack App
This is a fullstack project which the backend fetch the data from https://restcountries.com/, paginates it and returns the data, and the frontend fetch from the backend and display the data into a table which the user can filter, sort and paginate.

This was developed for a job application but since I've haven't got an answer from the company I've decided to publish the project as-is, archive it (I'll explain soon why) and document the process of improve this project because it allows me to have a project to show and tell for future job interviews.

The reason to archive this project is to fork into a new repository and then show the before and after of all the needed improvements. In the new repository I'll code all that could lead into a top-tier project like good code practices, improvements on performance, new requirements, testing, and even try new stuff like stress tests, multithreading and the use of other javascript runtimes like Deno or Bun

Despite this project was developed against time, still can be executed with low or none errors. The instructions to deploy locally or via Docker are explained below:

## Deploying locally
In both backend and frontend folders:
1. Rename the .env.example file to env.
2. In the root of both folders execute npm install
3. In the same root folders execute npm run dev to deploy a development version of both services
4. Enter to localhost:3000 (or via the selected port in the env file)

## Deploying locally with Docker and Docker Compose
The advantages of using docker to deploy locally this project are:
- No need to provide an env file since the environment variables are setted into the docker-compose.yml file
- All the instalation and configuration will not interfiere with the main O.S.

The requirements for this approach is to have already installed Docker and Docker Compose. To ensure Docker is installed and running execute in cmd or terminal docker -v and docker-compose-v. If the version showns you are ready to continue, on the contrary install docker from https://www.docker.com/

When you have Docker running, follow this instructions:
1. Execute docker compose run (if itsn't first time building the images, its recommended to add the --build flag to force rebuilding)
2. Once finished enter to localhost:3000 (or via the selected port in the envronment variable filled in the docker-compose.yml)
3. To stop the containers  you can do Ctrl+C in windows, or execute docker compose down, also you can execute docker compose down -v to remove any volumes and any leftover from the containers

## Compile for production
Despite both projects were coded and intended to execute on a development environment, it can be compiled for production environments. Here are the instructions to compile and deploy both projects

### Backend
1. After running npm i execute npm run build to compile the server
2. Run npm run start to run the compiled server
3. The compiled server is generated inside the /dist folder so you can copy it and run it in the nodejs runtime of your preference like Node, Deno or Bun (tested on Node v20.15.0)

### Frontend
1. After running npm i execute npm run build to compile the client
2. The compiled client is generated inside the /dist folder so you can copy it and run it in the http server of your preference like Apache, Nginx or Lighttpd