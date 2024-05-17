# 🦺 kthcloud/showcase - fullstack
This showcase will show you how to use kthcloud to setup a fullstack application.

The application is comprised of three components:

- React frontend, in the `frontend` directory
- Flask backend, in the `api` directory
- MongoDB database, setup with the config below.

## Prerequisites
You will need [Bun](https://bun.sh) and [Python](https://www.python.org/downloads/) installed on your machine.

## Installation in kthcloud
You will need three separate deployments for this project. One for each component.

The database can be created as a "prebuilt" deployment, meaning you only specify a Docker image tag. We will be using `mongo`. 
Setup the default account, password and database in the `MONGO_INITDB_ROOT_USERNAME`, `MONGO_INITDB_ROOT_PASSWORD` and `MONGO_INITDB_DATABASE` environment variables.
Databases need persistant storage, so make sure to add a volume to the deployment. Example: 

```
Name: db-data
App path: /data/db
Storage path: /fullstack/db
```

Create deployments for the frontend and API components, and link the github workflows in your repository. Add the secrets to your repo's Actions Repository Secrets.
Your API will need an environment variable `MONGO_URI` with the value `mongodb://username:password@<db-deployment-name>:27017/<MONGO_INITDB_DATABASE>`.

## Interconnecting the components
While accessing your deployments publically is made easy with our ingress, which upgrades to HTTPS and reroutes traffic to the real 80 and 443 ports, communication behind the scenes is a bit more tricky, and uses the internal DNS and ports.

The frontend runs in your web browser, ergo outside our ingress, so it will use `https://your-api.app.cloud.cbh.kth.se` to communicate with the API.
The API however will be running inside the kthcloud network, so it will use internal ports and names to communicate with the database.

## Testing
Open the frontend in your browser and see if it can create and retrieve data. If it can, you have successfully setup a fullstack application in kthcloud!