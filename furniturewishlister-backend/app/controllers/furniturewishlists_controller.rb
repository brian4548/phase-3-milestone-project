class FurniturewishlistsController < ApplicationController
    def index
        all = Furniturewishlist.all
        render json: all
    end

    def create
        furniture_wishlist = Furniturewishlist.create(furniture_wishlist_params)
        render json: furniture_wishlist
    end

    def delete
        joiner = Furniturewishlist.find_by(id: params[:id])
        joiner.destroy
    end

    private

    def furniture_wishlist_params
        params.require(:furniture_wishlist).permit(:furniture_id, :wishlist_id)
    end
end
