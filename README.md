# Foodkit (static) website #

We want to use *static* files for the [Foodkit.io](https://foodkit.io) website, because they're fast, easy to serve, and secure.

But maintaining a full website using static HTML is painful because of code duplication and content management.

To gain the performance and security benefits of a static site while maintaining the flexibility and speed of development of a dynamic site, we use [Middleman](https://middlemanapp.com).

Middleman allows us to maintain our site using Ruby/Erb files which are compiled down to static HTML during deployment.

## Development ##

Middleman provides a web server which can be run using:

```
bundle exec middleman
```

Middleman will watch the file system and automatically recompile assets as needed.

See [here](https://middlemanapp.com/basics/development-cycle/) for more information.

## Deployment ##

Use `bin/deploy.sh` to create a production build and sync it with the remote server.

```
USERNAME=user IDENTITY=~/.ssh/id_rsa.pub bin/deploy.sh
```
