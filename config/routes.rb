Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    resource :user, only: [:create, :index, :show, :update]
    resource :session, only: [:create, :destroy]
  end

  get 'api/users/:id/follows', :to => 'api/users#follows_create'
  get 'api/follows/:id', :to => 'api/users#follows_destroy'

  root "static_pages#root"
end
