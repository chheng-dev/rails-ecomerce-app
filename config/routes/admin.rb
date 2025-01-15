namespace :admin do 
  root "dashboard#index"

  resources :posts
  resources :categories
  resources :brands
end