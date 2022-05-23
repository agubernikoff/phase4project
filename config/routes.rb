Rails.application.routes.draw do
  
  post "/login", to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get "/me", to: 'users#show'
  post "/signup", to: 'users#create'
  get '/users', to: 'users#index'
  patch '/me', to: 'users#update'
  get '/pixels', to: 'pixels#index'
  get '/edits',to: 'edits#index'
  post '/edits', to:'edits#create'
  delete '/users', to: 'users#destroy'
  get '/contested_pixels', to: 'pixels#contested_index'
  get '/contested_users',to:'users#contested_index'
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  mount ActionCable.server => '/cable'
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
