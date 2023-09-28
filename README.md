### Hello World K8s

## ~ 2 minutes

This example demonstrates how you can deploy a simple k8s application on a Uffizzi Cluster.


1. Login to your Uffizzi account
```
uffizzi login
```

2. Create a Uffizzi cluster
```
uffizzi cluster create
```

3. Update local kubeconfig with the Uffizzi cluster's kubeconfig
```
uffizzi cluster update-kubeconfig coolbean-cole
```

4. Apply Kubernetes Manifests
```
kubectl apply -f ./k8s
```
Wait for the deployment to come up

5. Get the Ingress to the deployed application
```
kubectl get ingress web --kubeconfig kubeconfig -o json | jq '.spec.rules[0].host' | tr -d '"'
```

