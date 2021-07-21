namespace :money_balance_daily_init do
  desc "１日一回０支出を投稿"
  task money_balance_daily_init: :environment do
    # Batch::money_balance_daily_init.money_balance_daily_init
	puts "Hoge!"
  end
end
