#!/usr/bin/env bash
url=http://localhost:3003/api/blogs
data=$1
content_type='Content-Type: application/json'
auth='Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InR1bmsiLCJpZCI6IjY1ZTZmOGUxMTQxYWRhMzI5MTViZTQwMCIsImlhdCI6MTcwOTY0MTU1N30.KV4-zLt1lYgyAWaxPCwF33qY9X9_jfKP6s6yNMB-fKo'
curl -v --header "Content-Type: application/json" --header "$auth" --data @$data $url