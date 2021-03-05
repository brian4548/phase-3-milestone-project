class CreateFurnitureWishlists < ActiveRecord::Migration[6.0]
  def change
    create_table :furniture_wishlists do |t|

      t.timestamps
    end
  end
end
