## To create a new pod, run:

\$ minikube kubectl -- apply -f [config].yaml

Commands:

\$ minikube kubectl -- get pods

\$ minikube kubectl -- delete pods --all
\$ minikube kubectl -- delete pod [pod_name]

\$ minikube kubectl -- describe pod posts

## When building image

docker build -t <docker-name>/posts:0.0.1 .

/////////

- Please try pushing the image to docker hub. Do a docker push <yourdockerid>/<imagename> .
- After that, delete the deployment with kubectl delete deployment posts
- then apply the deployment again with kubectl apply -f posts-depl.yaml

## DEPLOYMENTS

\$ minikube kubectl -- apply -f posts-depl.yaml

\$ minikube kubectl -- logs posts-depl-[id]

\$ minikube kubectl -- get deployments

\$ minikube kubectl -- describe deployment posts-depl

\$ minikube kubectl -- delete deployment posts-depl

////

\$ minikube kubectl -- rollout restart deployment posts-depl

### Start Minikube

`minikube start --vm=true`

### Delete Minikube

`minikube stop && minikube delete`

### Get local Minikube ip (e.g. for NodePort)

`minikube ip`

### After making changes to micro-service:

- rebuild image:

`docker build -t <docker-name>/<image-name> .`

- OR rebuil image without cache

`docker build --no-cache -t <your_tag>/posts . `

- push image

`docker push <docker-name>/<image-name>`

- get deployments

`mk get deployments`

- restart deployment

`mk rollout restart deployment <deployment-name>`

- get pods and see that they restarted

`mk get pods`

### Get logs

- get pods

`mk get pods`

- get log for pod

`mk logs <pod-name>`

### Get inside pod:

- get pods

`mk get pods`

- get inside

`mk exec -it <pod-name> sh`

## Port-forwarding

- get pods

`mk get pods`

- establish port-forwarding

`mk port-foward <POD_NAME> <port on local machine>:<port on pod to access>`

### Create a kubernetes secret

- create secret

`mk create secret generic <jwt-secret> --from-literal=<JWT_KEY='secret'>`

- get all secrets

`mk get secrets`

### Remove docker images

- list all images

`docker images -a`

- delete image by ID

`docker rmi -f <image ID>`

- OR remove all images

`docker rmi $(docker images -a -q)`

### Start skaffold

- Navigate to same directory as skaffold.yaml and run

`skaffold dev`

- Clean-up if skaffold does not

`skaffold delete`

### Create alias for 'minikube kubectl' etc.

- in Powershell, create a function:

`Function MKube { minikube kubectl -- $args }`

- assign that function to an alias:

`Set-Alias mk MKube`

- or together

`Function MKube { minikube kubectl -- $args } & Set-Alias mk MKube`

- Now that function can be used as shorthand:

`mk get pods`

### Get ingress

`minikube addons enable ingress`

- If ingress fails with 'Internal error occurred: failed calling webhook "validate.nginx.ingress.kubernetes.io"', run:

`minikube kubectl -- delete -A ValidatingWebhookConfiguration ingress-nginx-admission`

### Get ingress-nginx ip

`mk get pods -n ingress-nginx`

`mk describe pod ingress-nginx-controller-<TAG> -n ingress-nginx`
