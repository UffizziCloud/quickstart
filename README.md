# Uffizzi Quickstart (~2 min)

This repo demonstrates how you can create Kubernetes virtual clusters on Uffizzi Cloud. You can choose between creating a standard [virual cluster](#create-a-virtual-cluster) or a [dev cluster](#development-dev-cluster). Dev clusters are standard virtual clusters with additional developer tooling for building, testing, and auto-deploying your local project files. [Learn more >](https://docs.uffizzi.com/docs/quickstart)

## Prerequisites

- [Install](https://kubernetes.io/docs/tasks/tools/install-kubectl/) `kubectl`  
- [Install](https://docs.uffizzi.com/installation) the Ufizzi CLI  
- [Create an account](https://docs.uffizzi.com/installation#authentication) on Uffizzi Cloud  

## Create a virtual cluster

**1. Clone this repository**
``` bash
git clone https://github.com/UffizziCloud/quickstart.git && \
cd quickstart
```

**2. Authenticate with Uffizzi**
``` bash
uffizzi login
```

This command will open a browser window for you to login or create an account.

**3. Create a virtual cluster**
``` bash
uffizzi cluster create quickstart
# [⠦] Creating cluster quickstart...
```

**4. Apply Kubernetes manifests**
``` bash
kubectl apply -f ./k8s
```

The `./k8s` directory contains a [`web.yaml`](https://github.com/UffizziCloud/quickstart/blob/main/manifests/web.yaml) manifest that includes a `service`, `ingress` and `deployment` resources.  

**5. Get the Ingress to the deployed application** 
``` bash
kubectl get ingress web --kubeconfig ~/.kube/config -o json | jq '.spec.rules[0].host' | tr -d '"'
```

Replace `~/.kube/config` with the path to your kubeconfig file if different. The host address should look something like this:  
> `web-default-quickstart-c850.uclusters.app.uffizzi.com`  

You can `curl` this address, or copy and paste it into your browser to see the application running.

**7. Cleanup**
``` bash
uffizzi cluster delete quickstart
```

## Development (dev cluster)

If you want to make changes to the application, you can spin up a new instance in a dev cluster. Changes you make in the dev cluster will not affect the original virtual cluster. 

**1. Clone this repository**

If you haven't already, clone this repository:  

``` bash
git clone https://github.com/UffizziCloud/quickstart.git && \
cd quickstart
```

**2. Authenticate with Uffizzi**
``` bash
uffizzi login
```

This command will open a browser window for you to login or create an account.

**3. Start a dev cluster**
``` bash
uffizzi dev start --quiet
# Start creating a cluster
# Checking the cluster status...
# Cluster with name: barrow-indigo was created.
# ...
# Press Ctrl+C to exit
# Watching for changes...
```

If you want to see the logs, remove the `--quiet` flag.

_Be sure you are in the root directory of this repository. The `start` subcommand looks for a `skaffold.yaml` file in the current directory._

**4. Get the ingress**
``` bash
kubectl get ingress web --kubeconfig ~/.kube/config -o json | jq '.spec.rules[0].host' | tr -d '"'
```

Replace `~/.kube/config` with the path to your kubeconfig file if different.

The host address should look something like this:  

> `web-default-dev-quickstart-1b0b.uclusters.app.uffizzi.com`

You can `curl` this address, or copy and paste it into your browser to see the application running.

**5. Make a change**

You can make a change to the application and see it reflected in the deployed application. For example, change the `src/index.js` file to say "Hello, Uffizzi!":

``` javascript title="src/index.js"
'use strict';

const express = require('express')
const app = express()

app.use(express.static('public'));
app.get('/', (req, res) => res.send('Hello, Uffizzi!'))

const port = 8080
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
```

You may need to refresh the browser to see the changes.

**6. Cleanup**  

To stop the dev cluster, run:  
```
uffizzi dev stop
```

Or if you did not include the `--quiet` option, press `ctrl + c` in the terminal window where you ran `uffizzi dev start`.  

## A note about Uffizzi Ingress and networking  

If your Pods provide an HTTP service, you may expose them to the Internet by defining an `Ingress`—either your own custom `Ingress` or the default one provided by Uffizzi. To use the default `Ingress`, set its `ingressClassName: uffizzi` as shown [here](https://github.com/UffizziCloud/quickstart/blob/841925ae2178e8d92aec9fef61f6f245748a127d/k8s/web.yaml#L18), or do not specify any `ingressClassName` and it will specify itself. By using the default, Uffizzi will provision for you an external IP address, generate a domain, and request a TLS certificate. This is a convenient option, especially for dev clusters, as you can use HTTPS in your applications, without the work of dynamically configuring domains and certs.  

If your Pods provide another kind of TCP service, you may instead expose them to the Internet by defining a `Service` of `type: LoadBalancer`. This will obtain an external IP address from Uffizzi's infrastructure provider.

