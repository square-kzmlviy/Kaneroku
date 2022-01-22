class AddColumnDateFromMonneyBalance < ActiveRecord::Migration[5.2]
  def change
    add_column :money_balances, :date, :date
  end
end
