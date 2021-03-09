class Wishlist < ApplicationRecord
    belongs_to :user 
    has_many :wishlist_furnitures
    has_many :furnitures, through: :wishlist_furnitures
end