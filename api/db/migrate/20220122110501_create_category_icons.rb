class CreateCategoryIcons < ActiveRecord::Migration[5.2]
  def change
    create_table :category_icons do |t|
      t.string :img_path

      t.timestamps
    end
  end
end
