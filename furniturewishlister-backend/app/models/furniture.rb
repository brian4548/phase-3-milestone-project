class Furniture < ApplicationRecord
    
    has_many :furniturewishlists
    has_many :wishlists, through: :furniturewishlists
end
