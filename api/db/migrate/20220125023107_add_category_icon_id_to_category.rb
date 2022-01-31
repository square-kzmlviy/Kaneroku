class AddCategoryIconIdToCategory < ActiveRecord::Migration[5.2]
  def change
    add_reference :categories, :category_icon, foreign_key: true
  end
end
