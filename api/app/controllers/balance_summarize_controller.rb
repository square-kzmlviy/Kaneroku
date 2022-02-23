class BalanceSummarizeController < ApplicationController
    def index
        @this_day = Date.today
        @this_monday = @this_day - (@this_day.wday - 1)
        @this_sunday = (@this_day - (@this_day.wday - 1))+6
        this_day_total = current_user.money_balances
                                     .left_joins(:category)
                                     .where(date:@this_day)
                                     .where('categories.is_income = ?',false)
                                     .sum(:value)
        this_week_total = current_user.money_balances
        .left_joins(:category)
        .where(date:@this_monday..@this_day)
        .where('categories.is_income = ?',false)
        .sum(:value)
        
        def this_week_history
            week_history = []
            (@this_monday..@this_day).each do |current_day|
                week_history.push(current_user.money_balances
                                                .left_joins(:category)
                                                .where(date:current_day)
                                                .where('categories.is_income = ?',false)
                                                .sum(:value))
            end
            week_history
        end
        def this_week_dates
            week_dates = []
            (@this_monday..@this_day).each do |current_day|
                week_dates.push(current_day)
            end
            week_dates
        end


        render json: {daily_total:this_day_total,weekly_total:this_week_total,week_history:this_week_history,week_dates:this_week_dates},status: 200
    end
end
