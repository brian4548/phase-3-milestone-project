class UsersController < ApplicationController
    def index
        user = User.all 
        render json: user
    end

    def show
        current_user = User.find_or_create_by(username: params[:username])
        # byebug
        render json: current_user.to_json(:include => {
            :furnitures => {:except => [:created_at, :updated_at]},
            :wishlists => {:except => [:created_at, :updated_at], :include => [:furnitures]}
            }, :except => [:created_at, :updated_at]
        )
    end
end
