class Wishlist < ApplicationRecord
    belongs_to :user
    has_many :furniturewishlists
    has_many :furnitures, through: :furniturewishlists
end
