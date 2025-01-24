namespace :api do 
  resources :categories
  resources :brands
  resources :option_types do 
    resources :option_values
  end
  resources :products do 
    # get 'option_types', to: 'products#option_types_by_product', on: :member
    # put 'update_stock', to: 'products#update_stock', on: :member
    # put :update_all_stock, on: :collection
    member do 
      get 'option_types', to: 'products#option_types_by_product'
      put 'update_stock'
    end
    
    collection do
      delete :batch_destroy
      put :update_multiple_stocks
    end
  end
end  