# 🤸 kthcloud/showcase
Example projects on kthcloud - Take a look and get started deploying on kthcloud!

## Fullstack
This showcase will show you how to use kthcloud to setup a fullstack application. See the [instructions](/fullstack/README.md)

## Websockets
The websockets example shows how websockets can be used, and are automatically upgraded to wss, http is also upgraded to https by our proxy.

You can see them live at:
- https://showcase-websockets-frontend.app.cloud.cbh.kth.se/
- https://showcase-websockets-backend.app.cloud.cbh.kth.se/

## APIs 
The APIs example shows how to use kthcloud deployments for simple REST APIs with various programming languages. 
For examples on how to deploy them with CI/CD, see the `.github/workflows` folder.

The APIs all have some landing page at the `/` route, and a mock resource at `/v1/resource`.
You can see these live at:
- https://showcase-c-api.app.cloud.cbh.kth.se/v1/resource
- https://showcase-go-api.app.cloud.cbh.kth.se/v1/resource
- https://showcase-java-api.app.cloud.cbh.kth.se/v1/resource
- https://showcase-js-api.app.cloud.cbh.kth.se/v1/resource
- https://showcase-rust-api.app.cloud.cbh.kth.se/v1/resource

## Scripts
Excited to build something on top of kthcloud? We provide a REST API and a Python SDK to interact with it. 

You can find documentation about the REST API at:
- https://api.cloud.cbh.kth.se/deploy/v1/docs/index.html
- https://api.cloud.cbh.kth.se/deploy/v2/docs/index.html

The Python SDK code can be found at:
https://github.com/kthcloud/python-sdk and installed with `pip install kthcloud`.

See the example scripts in the [scripts](/scripts/README.md) folder for how to use it.