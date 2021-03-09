class WishlistFurnituresController < ApplicationController
    def index
        all = WishlistFurniture.all
        render json: all
    end

    def create
        wishlist_furniture = WishlistFurniture.create(wishlist_furniture_params)
        render json: wishlist_furniture
    end

    def delete
        joiner = WishlistFurniture.find_by(id: params[:id])
        joiner.destroy
    end

    private

    def wishlist_furniture_params
        params.require(:wishlist_furniture).permit(:furniture_id, :wishlist_id)
    end
end
