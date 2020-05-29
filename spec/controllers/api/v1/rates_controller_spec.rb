require 'rails_helper'

RSpec.describe Api::V1::RatesController, type: :controller do

	describe "POST #create" do

		context "when rate fixed_rate and until_time are empty" do
	
			it "should not be saved" do
				post :create, params: {rate: {fixed_rate: "", until_time: ""}}, format: :json
				expect(response.body["errors"].present?).to be(true)
			end
	
		end
	
		context "when rate fixed_rate and until_time are not empty" do
				
			it "should be saved" do
				post :create, params: {rate: {fixed_rate: "56.5", until_time: Time.now()}}, format: :json
				expect(response.body["errors"].present?).to be(false)	
			end
		end

	end

end
