class WishlistsController < ApplicationController
    def index
        wishlists = Wishlist.all
        render json: wishlists, include: [:furnitures]
    end

    def create
        new_item = Wishlist.create(wishlist_params)
        render json: new_item
    end

    def update
        wishlist = Wishlist.find(params[:id])
        wishlist.update(wishlist_params)
        render json: wishlist
    end

    def delete
        wishlist = Wishlist.find_by(id: params[:id])
        wishlist.destroy
    end

    private

    def wishlist_params
        params.require(:wishlist).permit(:name, :season, :occasion, :user_id)
    end
end