namespace :admin do 
  root "dashboard#index"

  resources :posts
end