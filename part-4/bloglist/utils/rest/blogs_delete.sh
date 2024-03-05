#!/usr/bin/env bash
source "./.env"
url=http://localhost:3003/api/blogs/$1
curl -v -X DELETE --header "Authorization: Bearer $TOKEN" $url 