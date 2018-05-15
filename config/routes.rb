Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :index, :show, :update]
    resource :session, only: [:create, :destroy]
    resources :posts, only: [:create, :show, :update, :delete]
  end

  post 'api/users/:id/follows', :to => 'api/users#follows_create'
  delete 'api/follows/:id', :to => 'api/users#follows_destroy'

  get 'api/users/:id/posts', :to => 'api/posts#index'
  post 'api/posts/:id/likes', :to => 'api/posts#likes_create'
  delete 'api/likes/:id', :to => 'api/posts#likes_destroy'

  root "static_pages#root"
end
