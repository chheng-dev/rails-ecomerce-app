namespace :api do 
  resources :categories
  resources :brands
  resources :option_types do 
    resources :option_values
  end
  resources :products
end