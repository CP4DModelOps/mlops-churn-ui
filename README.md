# MLOps Workshop - Customer Churn UI

User Interface of customer churn demo application for MLOps workshop.

This app contains an opinionated set of components for modern web development, including:

* [React](https://facebook.github.io/react/)
* [Sass](http://sass-lang.com/) 
* [Carbon](https://www.carbondesignsystem.com/)
* [Create React App](https://github.com/facebook/create-react-app)

## Deploy on OpenShift

### Install Cloud-Native Toolkit

#### Prereqs

* [Docker](https://docs.docker.com/engine/install/) (if challenging you can use [Gitpod](https://gitpod.io/)).
* OpenShift **server URL** and **login token**: get them by cliking on your name in the top right corner of OpenShift console, then click **Copy login command** and **Display token**.
* GitHub access with **personal access token**: we strongly suggest to setup zero trust policy by using [fine-grained tokens](https://github.com/settings/tokens?type=beta) with following **Repository permissions**:
  * **Read** access to metadata
  * **Read** and **Write** access to administration, code, commit statuses, merge queues, pull requests, and repository hooks.

#### Run terraform automation

On your workstation, open a terminal:

```sh
git clone https://github.com/cloud-native-toolkit/automation-solutions
cd automation-solutions
curl -sL https://iascable.cloudnativetoolkit.dev/install.sh | sh
iascable build -i boms/infrastructure/_common/200-openshift-gitops.yaml
iascable build -i boms/infrastructure/_common/220-dev-tools.yaml
cd output/
./launch.sh
export TF_VAR_server_url="<CLUSTER_SERVER_URL>"
export TF_VAR_cluster_login_token="<CLUSTER_LOGIN_TOKEN>"
export TF_VAR_config_banner_text="<CLUSTER_BANNER_TEXT>"
export TF_VAR_gitops_repo_host="github.com"
export TF_VAR_gitops_repo_org="<GITOPS_REPO_ORG>" # Skip if using personal repo
export TF_VAR_gitops_repo_repo="<GITOPS_REPO_NAME>"
export TF_VAR_gitops_repo_username="<GIT_USERNAME>"
export TF_VAR_gitops_repo_token="<GIT_TOKEN>"
cp -r . /workspaces/current
cd /workspaces/current
cd 200-openshift-gitops/terraform/
terraform init
terraform apply
cd ../../220-dev-tools/terraform
terraform init
terraform apply
```

#### Setup Artifactory

TODO

### Setup CI using Cloud-Native Toolkit pipelines (Tekton)

TODO

### Setup CD using GitOps with ArgoCD

TODO
