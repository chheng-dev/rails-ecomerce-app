namespace :api do 
  resources :categories
  resources :brands
  resources :option_types do 
    resources :option_values
  end
  resources :products do 
    get 'option_types', to: 'products#option_types_by_product', on: :member
    delete :batch_destroy, on: :collection
  end
end