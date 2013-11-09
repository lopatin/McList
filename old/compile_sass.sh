#!/bin/bash
BASEDIR=$(dirname $0)
sass --watch ${BASEDIR}/sass:${BASEDIR}/public/styles
