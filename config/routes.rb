Rails.application.routes.draw do

	root "home#index"

  get "/admin", to: 'home#index'

	namespace :api do
  	namespace :v1 do
  		resources :rates, only: [:index, :create]
			get "all_rates", to: 'rates#all_rates'
  	end
  end



	mount ActionCable.server => '/cable'

end
