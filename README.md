### Example: buildpacks (NodeJS)

This is an example demonstrating:

* **building** a simple NodeJS app built with [Cloud Native Buildpacks](https://buildpacks.io/)
* **tagging** using the default tagPolicy (`gitCommit`)
* **deploying** a single container pod using `kubectl`

1. Make sure you have `skaffold` installed and `docker` running.

2. Run the following command in the context of the repo to start skaffold in dev mode. Make sure you are also in the context of your ucluster where you want to test out your application. By default it watches for file changes. So as you update any code a redeploy will be triggered. Happy skaffolding with Uffizzi ! 

```
skaffold dev --default-repo registry.uffizzi.com
```
