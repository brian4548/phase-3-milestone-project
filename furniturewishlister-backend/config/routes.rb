Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # get "/furnitures", to: "furnitures#index"
  post "/furnitures", to: "furnitures#create"
  delete "/furnitures/:id", to: "furnitures#delete"
  patch "/furnitures/:id", to: "furnitures#update"
  get "/users", to: "users#index"
  get "/users/:username", to: "users#show"
  get "/wishlists", to: "wishlists#index"
  post "/wishlists", to: "wishlists#create"
  patch "/wishlists/:id", to: "wishlists#update"
  delete '/wishlists/:id', to: "wishlists#delete"
  get '/wishlist_furnitures', to: "wishlist_furnitures#index"
  post '/wishlist_furnitures', to: "wishlist_furnitures#create"
  delete '/wishlist_furnitures/:id', to: "wishlist_furnitures#delete"

end
