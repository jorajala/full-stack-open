#!/usr/bin/env bash
url=http://localhost:3003/api/login
data=$1
curl -v -H "Content-Type: application/json" --data @$data $url