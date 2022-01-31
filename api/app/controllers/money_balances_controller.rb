# frozen_string_literal: true

class MoneyBalancesController < ApplicationController
  def index
    if current_user
      money_balances = current_user.money_balances
                                   .left_joins(category: :category_icon)
                                   .select('money_balances.id,
                                            money_balances.value,
                                            categories.name,
                                            money_balances.date,
                                            category_icons.img_path')
      render json: money_balances, status: :ok
    else
      render json: { data: [], message: 'ユーザーが存在しません' }, status: :no_content
    end
  end

  def create
    if current_user
      money_balance = MoneyBalance.new(balance_create_params)
      if money_balance.save
        render json: { category: money_balance }, status: 200
      else
        render  status: :bad_request
      end
    else
      render json: { data: [], message: 'ユーザーが存在しません' }, status: :no_content
    end
  end

  def balance_create_params
    params.require(:money_balance).permit(:value, :date,:category_id).merge(user_id: current_user.id)
  end
end
