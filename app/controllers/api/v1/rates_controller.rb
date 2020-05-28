class Api::V1::RatesController < ApplicationController
	skip_before_action :verify_authenticity_token

	def index
  	rate = Rails.cache.read("rate")
  	if rate != nil
  		fixed_rate = rate.fixed_rate
 			render json: {rub: fixed_rate}
		else
			render json: {rub: 1}			
		end
	end	

	def create
		rate = Rate.new(rate_params)
		if rate.save
			Rails.cache.write("rate", rate)
			UpdateCurrencyRatesJob.perform_now
			render json: rate
		else
			render json: {errors: rate.errors.messages}
		end
	end	

	def all_rates
		render json: Rate.all
	end	

	private

		def rate_params
			params.require(:rate).permit(:fixed_rate, :until_time)
		end

end
