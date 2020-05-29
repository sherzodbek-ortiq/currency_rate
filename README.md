# README

This app uses sedkiq, redis and background jobs.
It updates currency rate USD to RUB every minute.
It gets rates from a free API from Estonia and it may update slow

## Run all the commands below if you want to make it work

### Run tests

	rspec

### Schedule cron tasks

	whenever --update-crontab

### Run everything with one command

	foreman start -f Procfile.dev

### Note

It uses a React.js package for picking date and time and it may have accuracy issue.
So you may need to pick grater date if you want the fixed rate to be shown. Spasibo za vremya!