#!/bin/bash

# kill the existing process
# select only line with "node" as it's the beginning of all
# if `grep node` returns multiple lines, then only the first line will be used
# (as it's mainly the process that server instance started it)
RESULT=$(lsof -i :9000 | grep node | sed '1,1!d' | awk ' {print $2} ')

# start the new process in the backround
if [ "$RESULT" != "" ]
then
    kill -9 $RESULT && echo "killed existing fkit server instance"

    node ../server.js >> ../fkit-server.log 2>&1 &
	if [ $? -eq 0 ]; then
		echo "started fkit server instance"
	fi
else
    node ../server.js >> ../fkit-server.log 2>&1 &
	if [ $? -eq 0 ]; then
		echo "started fkit server instance"
	fi
fi
