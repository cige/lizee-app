#!/bin/bash

echo 'Checking availabilities from 2021-04-24 to 2021-05-09'
echo
echo 'API returns:'
curl -H "Content-Type: application/json" --data "`cat scripts/samples/availability1.json`" localhost:3000/availability
echo