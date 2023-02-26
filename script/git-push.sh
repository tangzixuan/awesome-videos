git config  pull.rebase true
git stash
git pull
git stash apply
git add .
time=$(date "+%Y-%m-%d %H:%M:%S")
git commit -m "feat: ${time}"
git push 