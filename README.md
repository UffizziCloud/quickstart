# Hello World for Uffizzi Virtual Clusters (~2 min)

This repo demonstrates how you can create Kubernetes virtual cluster on Uffizzi Cloud, then apply manifests for an example application.

1. Clone this repository
```
git clone https://github.com/UffizziCloud/quickstart.git && \
cd quickstart
```

2. Authenticate with Uffizzi. This command will open a browser window for you to login or create an account.
```
uffizzi login
```

3. Create a Uffizzi cluster
```
uffizzi cluster create quickstart
# [⠦] Creating cluster quickstart...
```

4. Apply Kubernetes Manifests
```
kubectl apply -f ./k8s
```
Wait for the deployment to come up  

5. Get the Ingress to the deployed application  
```
kubectl get ingress web --kubeconfig ~/.kube/config -o json | jq '.spec.rules[0].host' | tr -d '"'
```

The host address should look something like this:  
> `web-default-quickstart-c850.uclusters.app.uffizzi.com`  

You can `curl` this address, or copy and past it into your browser to see the application running.

7. Cleanup
```
uffizzi cluster delete quickstart
```
