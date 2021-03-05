class Wishlist < ApplicationRecord
    belongs_to: user
    has_many: furnitures_wishlists
    has_many: furnitures, through: furnitures_wishlists
end
