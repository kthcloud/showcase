# 🦺 kthcloud/showcase - fullstack
This showcase will show you how to use kthcloud to setup a fullstack application.

The application is comprised of four components:

- React frontend, in the `frontend` directory
- Flask backend, in the `api` directory
- MongoDB database, setup with the config below.
- mongo-express, a web-based MongoDB exporer.

## Prerequisites
You will need [Bun](https://bun.sh) and [Python](https://www.python.org/downloads/) installed on your machine.

## Installation in kthcloud
You will need four separate deployments for this project. One for each component.

The database can be created as a "prebuilt" deployment, meaning you only specify a Docker image tag. We will be using `mongo:4.4.6`. 
Setup the default account, password and database in the `MONGO_INITDB_ROOT_USERNAME`, `MONGO_INITDB_ROOT_PASSWORD` and `MONGO_INITDB_DATABASE` environment variables.
Databases need persistant storage, so make sure to add a volume to the deployment. Example: 

```
Name: db-data
App path: /data/db
Storage path: /fullstack/db
```
Set the mongodb deployment to use Private visibility as it will not be accessed from the outside. You may need to create the volumes, if you see a Mount error, which can be done by clicking "Manage Storage" and creating the appropriate directories.
Your mongodb URI will be something like `mongodb://username:password@<db-deployment-name>:27017/<MONGO_INITDB_DATABASE>`.

Create your mongo-express deployment, with `mongo-express` as the image, and link it to your database deployment. Add the environment variable `ME_CONFIG_MONGODB_URL`, and specify a username and password for the UI, in `ME_CONFIG_BASICAUTH_USERNAME` and `ME_CONFIG_BASICAUTH_PASSWORD` as explained [here](https://github.com/mongo-express/mongo-express-docker/blob/master/README.md).

You can now ensure your needed database and collections are available by using the mongo-express UI.

Create deployments for the frontend and API components, and link the github workflows in your repository. Add the secrets to your repo's Actions Repository Secrets.
Your API will need an environment variable `MONGO_URI`.

## Interconnecting the components
While accessing your deployments publically is made easy with our ingress, which upgrades to HTTPS and reroutes traffic to the real 80 and 443 ports, communication behind the scenes is a bit more tricky, and uses the internal DNS and ports.

The frontend runs in your web browser, ergo outside our ingress, so it will use `https://your-api.app.cloud.cbh.kth.se` to communicate with the API.
The API however will be running inside the kthcloud network, so it will use internal ports and names to communicate with the database, which can be achieved using the deployment name as the hostname, omitting the `https://` and `.app.cloud.cbh.kth.se` parts.

## Testing
Open the frontend in your browser and see if it can create and retrieve data. If it can, you have successfully setup a fullstack application in kthcloud!

## Security
Exposing mongo-express is not a great idea, and should not be done in a production scenario. It is only used here for debugging purposes.