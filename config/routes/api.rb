namespace :api do 
  devise_scope :user do
    post '/login', to: 'sessions#create' 
    delete '/logout', to: 'sessions#destroy' 
    post "/refresh_token", to: 'sessions#refresh_token' 
    post "/register", to: "registrations#create"
  end

  resources :categories
  resources :brands
  resources :option_types do 
    resources :option_values
  end

  resources :products do 
    member do 
      get 'option_types', to: 'products#option_types_by_product'
      put 'update_stock'
      put 'update_published_status'
    end
    
    collection do
      delete :batch_destroy
      put :update_multiple_stocks
    end
  end


end  