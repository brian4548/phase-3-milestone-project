class Furniture < ApplicationRecord
    belongs_to :user
    has_many :furnitureswishlists
    has_many :wishlists, through: :furnitureswishlists
end
