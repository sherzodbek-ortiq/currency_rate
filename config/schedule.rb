set :output, "log/cron.log"

every 1.minute do
	rake "rates:update_currency_rates"
end