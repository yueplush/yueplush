#!/bin/bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_github
git push