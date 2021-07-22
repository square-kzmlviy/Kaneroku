# frozen_string_literal: true

class CreateMoneyBalances < ActiveRecord::Migration[5.2]
  def change
    create_table :money_balances do |t|
      t.integer :value

      t.timestamps
    end
  end
end
