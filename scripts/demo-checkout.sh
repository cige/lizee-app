#!/bin/bash

curl -H "Content-Type: application/json" --data "`cat scripts/samples/checkout1.json`" localhost:3000/checkout
echo 'tent#10 is now unavailable for the end of may'
echo