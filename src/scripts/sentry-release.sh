#!/bin/bash

# Assumes you're in a git repository
export SENTRY_ORG=harmony-zkdao

if [[ -z "$NEXT_PUBLIC_RELEASE_VERSION" ]]; then
    echo "Must provide NEXT_PUBLIC_RELEASE_VERSION in environment" 1>&2
    exit 1
fi

# Create a release
sentry-cli releases new $NEXT_PUBLIC_RELEASE_VERSION

# Upload the source maps
sentry-cli releases files $NEXT_PUBLIC_RELEASE_VERSION upload-sourcemaps out

# Associate commits with the release
sentry-cli releases set-commits $NEXT_PUBLIC_RELEASE_VERSION --commit "$SENTRY_REPO_NAME@$COMMIT_REF"

# Finalize the release
sentry-cli releases finalize $NEXT_PUBLIC_RELEASE_VERSION