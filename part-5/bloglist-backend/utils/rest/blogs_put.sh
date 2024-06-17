#!/usr/bin/env bash
url=http://localhost:3003/api/blogs/$1

curl -v --header "Content-Type: application/json" -X PUT --data @$2 $url