# frozen_string_literal: true

class MoneyBalancesController < ApplicationController
  def index
    if current_user
      money_balances = current_user.money_balances
                                   .left_joins(category: :category_icon)
                                   .select('money_balances.id,
                                            money_balances.value,
                                            categories.id AS category_id,
                                            categories.name,
                                            money_balances.date,
                                            categories.is_income,
                                            category_icons.img_path')
                                            .order('money_balances.date DESC')
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

  def update
    if current_user
      
      if money_balance = MoneyBalance.find(params[:id]).update(balance_update_params)
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

  def balance_update_params
    params.require(:money_balance).permit(:value, :date,:category_id).merge(user_id: current_user.id)
  end
end
