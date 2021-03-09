class CreateWishlistFurnitures < ActiveRecord::Migration[6.0]
  def change
    create_table :wishlist_furnitures do |t|
      t.integer :furniture_id
      t.integer :wishlist_id
      t.timestamps
    end
  end
end
