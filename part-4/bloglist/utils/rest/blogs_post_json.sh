#!/usr/bin/env bash
source "./.env"
url=http://localhost:3003/api/blogs
data=$1
curl -v --header "Content-Type: application/json" --header "Authorization: Bearer $TOKEN" --data @$data $url