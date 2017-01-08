#!/bin/bash

# kill the existing process
# select only line with "node" as it's the beginning of all
RESULT=$(lsof -i :9000 | grep node | awk ' {print $2} ')

# start the new process in the backround
if [ "$RESULT" != "" ]
then
    kill -9 $RESULT && echo "killed existing fkit server instance"

    node ~/Data/Projects/fkit/server.js >> ~/Data/Projects/fkit/fkit-server.log 2>&1 &
	if [ $? -eq 0 ]; then
		echo "started fkit server instance"
	fi
else
    node ~/Data/Projects/fkit/server.js >> ~/Data/Projects/fkit/fkit-server.log 2>&1 &
	if [ $? -eq 0 ]; then
		echo "started fkit server instance"
	fi
fi
