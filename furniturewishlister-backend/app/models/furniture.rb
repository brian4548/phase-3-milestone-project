class Furniture < ApplicationRecord
    belongs_to :user 
    has_many :wishlist_furnitures
    has_many :wishlists, through: :wishlist_furnitures
end
