class FurnituresController < ApplicationController
    def index
        furnitures = Furniture.all 
        render json: furnitures, except: [:created_at, :updated_at]
    end

    def create
        new_item = Furniture.create(furniture_params)
        render json: new_item
    end

    def update
        item = Furniture.find(params[:id])
        item.update(furniture_params)
        render json: item
    end

    def delete
        item = Furniture.find_by(id: params[:id])
        item.destroy
    end

    private

    def furniture_params
        params.require(:furniture).permit(:name, :brand, :category, :color, :image, :type, :price)
    end
end
