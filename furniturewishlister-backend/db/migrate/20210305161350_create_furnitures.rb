class CreateFurnitures < ActiveRecord::Migration[6.0]
  def change
    create_table :furnitures do |t|
      t.string :name
      t.string :brand
      t.string :category
      t.string :color
      t.string :image
      t.string :type
      t.integer :price
      t.integer :user_id
      t.timestamps
    end
  end
end
