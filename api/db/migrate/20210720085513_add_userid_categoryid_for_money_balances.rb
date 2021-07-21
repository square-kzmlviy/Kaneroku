class AddUseridCategoryidForMoneyBalances < ActiveRecord::Migration[5.2]
  
	def change
		add_reference :money_balances, :user, foreign_key: true
		add_reference :money_balances, :category, foreign_key: true
	  end
end
