class CreateMoneyBalances < ActiveRecord::Migration[5.2]
  def change
    create_table :money_balances do |t|

      t.timestamps
    end
  end
end
