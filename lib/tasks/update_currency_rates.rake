desc "update currency rates"

namespace :rates do

	task update_currency_rates: :environment do
		UpdateCurrencyRatesJob.perform_later
	end

end
