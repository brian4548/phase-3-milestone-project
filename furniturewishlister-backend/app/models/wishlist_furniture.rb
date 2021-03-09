class WishlistFurniture < ApplicationRecord
    belongs_to :furniture
    belongs_to :wishlist
end
