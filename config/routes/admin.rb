namespace :admin do 
  root "dashboard#index"

  resources :posts
  resources :categories
  resources :brands
  resources :option_types do
    resources :option_values
  end
end