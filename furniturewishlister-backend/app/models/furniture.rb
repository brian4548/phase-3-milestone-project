class Furniture < ApplicationRecord
    belongs_to: user
    has_many: furnitures_wishlists
    has_many: wishlists, through: furnitures_wishlists
end
