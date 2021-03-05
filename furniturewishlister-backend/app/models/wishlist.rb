class Wishlist < ApplicationRecord
    belongs_to :user
    has_many :furnitureswishlists
    has_many :furnitures, through: :furnitureswishlists
end
