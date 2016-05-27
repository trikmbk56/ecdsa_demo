Rails.application.routes.draw do
  devise_for :users
  root "static_pages#home"
  get "help" => "static_pages#help"
  get "about" => "static_pages#about"
  get "demo_ecdsa" => "ecdsa#demo"
  get "generate_key" => "ecdsa#generate_key"
  get "generate_signature" => "ecdsa#generate_signature"
  get "verify_signature" => "ecdsa#verify_signature"

  resources :users, only: :show
end
