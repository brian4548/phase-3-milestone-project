class User < ApplicationRecord
    has_many :wishlists
    has_many :furnitures, through: :wishlists
end
