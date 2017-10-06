#!/bin/sh

##
# Usage:
#
#  USERNAME=user IDENTITY=~/.ssh/id_rsa.pub bin/deploy.sh
#

# paths
LOCAL_PATH=./build/
REMOTE_PATH=/var/www/dev

# server
USERNAME=${USERNAME:-"ec2-user"}
HOSTNAME=${HOSTNAME:-"ec2-13-228-223-254.ap-southeast-1.compute.amazonaws.com"}
IDENTITY=${IDENTITY:-"/Users/coreymcmahon/Dropbox/_WORK/Foodkit/AWS/FoodkitIO.pem"}
PORT=${PORT:-"22"}

# @todo: prevent deploy if build step fails
bundle exec middleman build
rsync -az --force --delete --progress -e "ssh -p $PORT -i $IDENTITY" $LOCAL_PATH $USERNAME@$HOSTNAME:$REMOTE_PATH
