#!/usr/bin/env bash
url=http://localhost:3003/api/blogs/$1
curl -v $url 