namespace :admin do 
  root "dashboard#index"

  resources :posts
  resources :categories
end